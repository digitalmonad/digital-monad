---
title: Understanding Program Execution
description: A mental model for how source code becomes instructions, state, and observable behavior.
---

# Understanding Program Execution

When we write a program, we usually think in terms of *what* it does:

```js
const result = add(2, 3);
console.log(result);
```

The runtime, however, does not see “calculate a result and print it.” It sees a sequence of instructions that manipulate values, memory, and control flow. At every moment, the program has a current state, and execution is the process of transforming that state.

This distinction is the foundation for understanding iterators, generators, coroutines, `async`/`await`, workflow engines, and durable execution. These features can look unrelated at the API level, but underneath they all answer the same question:

> How can we represent, suspend, resume, and recover a computation?

This article builds a practical mental model for answering that question.

## From source code to execution

Source code is a description of a computation. It is not the computation itself.

Depending on the language and runtime, the source may be transformed through several stages:

1. **Parsing** turns text into a structured representation, usually an abstract syntax tree (AST).
2. **Compilation or interpretation** turns that representation into instructions the runtime can execute.
3. **Execution** evaluates instructions, reads and writes state, and produces observable effects.

For example, this expression:

```js
total = price * quantity;
```

can be understood as a small sequence of operations:

```text
load price
load quantity
multiply
store total
```

The exact representation depends on the engine. A JavaScript engine may compile the code to bytecode and later optimize frequently executed paths into machine code. The important idea is more general: the runtime needs an executable representation and a place to keep the current state.

## The state of a running program

At a high level, execution state consists of at least four things:

- **The instruction position** — what should execute next?
- **Local variables** — what values are associated with the current function?
- **The call stack** — which functions are active, and where should control return?
- **The heap** — objects and other values that outlive a single function call.

Consider this program:

```js
function double(value) {
  return value * 2;
}

function main() {
  const input = 21;
  const output = double(input);
  return output;
}

main();
```

While `double` is running, the call stack can be pictured like this:

```text
┌──────────────────────────────┐
│ double(value = 21)           │
│ next: return value * 2       │
│ return to: main              │
├──────────────────────────────┤
│ main(input = 21)             │
│ next: assign output          │
│ return to: global code       │
└──────────────────────────────┘
```

Each function call creates an execution frame. The frame contains the information needed to continue the function and eventually return to its caller. When `double` returns, its frame disappears and `main` becomes the active frame again.

## Control flow is part of the state

Values alone do not describe a computation. We also need to know where execution should continue.

```js
let message;

if (enabled) {
  message = 'enabled';
} else {
  message = 'disabled';
}
```

After evaluating `enabled`, the runtime must select one of two possible instruction positions. The current state is therefore not simply a collection of variables. It is closer to:

```text
state = {
  instruction: "assign message in the enabled branch",
  variables: { enabled: true },
  stack: [...],
  heap: {...}
}
```

Loops make this even more obvious. A loop repeatedly moves execution back to an earlier instruction until a condition changes:

```js
let count = 0;

while (count < 3) {
  count += 1;
}
```

One possible abstract trace is:

```text
check count < 3  → true
increment count  → 1
check count < 3  → true
increment count  → 2
check count < 3  → true
increment count  → 3
check count < 3  → false
continue after loop
```

Execution is movement through a graph of possible instruction positions. Branches choose an edge; loops follow an edge back to an earlier point; function calls enter a new graph and save a return location.

## A computation as a state transition

We can describe a program more formally as a state transition function:

```text
next(state) → state'
```

One step of execution takes the current state and produces the next state. For the loop above, a simplified state might be just the value of `count` and the current instruction:

```text
({ instruction: check, count: 0 })
  → ({ instruction: increment, count: 0 })
  → ({ instruction: check, count: 1 })
  → ({ instruction: increment, count: 1 })
  → ...
```

This model is useful because it separates two concerns:

- **The computation** describes the possible transitions.
- **The runtime** decides when and how those transitions are performed.

Most ordinary programs let the runtime perform transitions continuously. The program starts, runs until it returns or throws, and the intermediate execution state remains inside the process.

The interesting features in this series appear when we make that state observable or controllable.

## The call stack: convenient, but temporary

The call stack is excellent for ordinary synchronous code. It automatically gives us nested calls, local variables, return addresses, and exception propagation.

It is also inherently temporary. If the process exits, the stack is gone. If a function is currently blocked on a long operation, its frame remains tied to the current thread or event-loop turn. A stack frame is not normally something we can serialize, send to another machine, or resume tomorrow.

That limitation explains why a simple function call is different from a resumable computation:

```js
function readUser() {
  return database.read('user-42');
}
```

Calling `readUser()` transfers control into the function. The caller does not normally get a handle that represents “the rest of `readUser`.” It gets a result, or an exception, when the function finishes.

To suspend and resume execution, we need to turn the implicit continuation—the work that remains—into something explicit.

## Continuations: the rest of the computation

A continuation is a useful name for “what should happen next.” In the earlier example:

```js
const output = double(input);
return output;
```

After `double(input)` finishes, the continuation is approximately:

```text
take the returned value
store it in output
return output
```

In a normal function call, the runtime stores this information in the call stack. In a resumable design, we may represent it explicitly as a function, an object, a program counter, or a serialized record.

One simple callback-based representation looks like this:

```js
function double(value, continuation) {
  continuation(value * 2);
}

double(21, result => {
  console.log(result);
});
```

The callback is not a complete representation of every local detail, but it makes the next step explicit. Instead of returning to an invisible caller, `double` invokes a continuation supplied by the caller.

Callbacks are one way to expose control flow. Promises, generators, coroutines, and workflow tasks provide different representations with better composition and operational behavior.

## Effects are not just values

A computation can produce two kinds of output:

1. A **value**, such as `42`.
2. An **effect**, such as writing to a file, sending a network request, or printing to a terminal.

This distinction matters when execution can be paused or retried. A pure calculation can usually be replayed safely:

```js
const total = price * quantity;
```

An external effect may not be safe to repeat:

```js
await payments.charge(customerId, amount);
```

If the process crashes after the payment succeeds but before the program records that success, a retry may charge the customer twice. A system that manages execution state must therefore track more than the next instruction. It must also define how effects are performed, recorded, deduplicated, or compensated.

This is the central challenge that eventually leads to durable execution.

## A small explicit interpreter

To make the model concrete, we can represent a computation as a list of instructions and execute one instruction at a time:

```js
const program = [
  { op: 'push', value: 2 },
  { op: 'push', value: 3 },
  { op: 'add' },
  { op: 'print' },
];

function step(machine) {
  const instruction = machine.program[machine.position];

  if (!instruction) {
    return { ...machine, done: true };
  }

  const stack = [...machine.stack];

  switch (instruction.op) {
    case 'push':
      stack.push(instruction.value);
      break;
    case 'add': {
      const right = stack.pop();
      const left = stack.pop();
      stack.push(left + right);
      break;
    }
    case 'print':
      console.log(stack.at(-1));
      break;
  }

  return {
    ...machine,
    stack,
    position: machine.position + 1,
  };
}

let machine = {
  program,
  position: 0,
  stack: [],
  done: false,
};

while (!machine.done) {
  machine = step(machine);
}
```

This is intentionally small, but it exposes the essential pieces:

- `position` is the program counter.
- `stack` is execution data.
- `step` is the transition function.
- `machine` is the complete resumable state.

We could stop after any call to `step`, serialize `machine`, and continue later. Real runtimes have far more complicated instruction sets and memory models, but the fundamental idea is the same.

## Why this model matters

Once execution is viewed as state transitions, several familiar abstractions become easier to understand:

- An **iterator** exposes a computation one step or value at a time.
- A **generator** packages a suspended function together with its continuation.
- A **coroutine** allows a computation to voluntarily give control to another computation.
- `async`/`await` transforms a continuation around an asynchronous operation.
- A **workflow engine** stores and schedules execution state outside the function call stack.
- **Durable execution** persists enough state and effect history to recover after failure.

The surface syntax changes, but the underlying questions stay consistent:

```text
Where is execution now?
What state does it carry?
What can it do next?
Who decides when it continues?
What survives a process failure?
```

## Looking ahead

In the next article, we will make execution stepwise with iterators and generators. We will see how `yield` turns an ordinary-looking function into a state machine and how the runtime preserves the point at which the function was suspended.

That is the first important shift in this series: execution does not have to be an invisible stream of instructions. It can be represented as a value that we can inspect, advance, pause, and compose.
