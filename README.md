# undebugify v0.1.0
> Browserify transform that removes configurable debug statements from a release build (e.g. asserts and tracing functions).

## Usage

Undebugify takes only a single configuration item: an array of function names.
Undebugify will remove all invocations of those functions from the code.

```{js}
// Example: Remove all instances of assert() and debugPrint() from code.
b.transform('undebugify', {
  remove: ['assert', 'debugPrint']
});
```

## Limitations

Undebugify is limited to matching function call statements by name, and thus
does not support functions invoked on objects (e.g. you could not remove `console.log`).

I can augment undebugify to support these scenarios if there is demand; just open an issue in the issue tracker.
