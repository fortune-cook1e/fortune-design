# Button

### Basic

<!--start-code-->

```js
ReactDOM.render(<Button>Default</Button>)
```

<!--end-code-->

### Type

<!--start-code-->

```js
ReactDOM.render(
  <div>
    <Button type='default'>Default Button</Button>
    <Button type='primary'>Primary Button</Button>
  </div>
)
```

<!--end-code-->

### Loading

<!--start-code-->

```js
ReactDOM.render(<Button loading>Default</Button>)
```

<!--end-code-->

### Size

<!--start-code-->

```js
ReactDOM.render(
  <div>
    <Button size='small'>Small</Button>
    <Button size='md'>Default</Button>
    <Button size='large'>Large</Button>
  </div>
)
```

<!--end-code-->

### Disabled

<!--start-code-->

```js
ReactDOM.render(
  <div>
    <Button disabled>Small</Button>
    <Button type='primary' disabled>
      Primary
    </Button>
  </div>
)
```

<!--end-code-->
