# Space

### Basic

<!--start-code-->

```js
ReactDOM.render(
  <Space gap={4}>
    <div style={{ width: 50, height: 50, border: '1px solid #000' }}>1</div>
    <div style={{ width: 50, height: 50, border: '1px solid #000' }}>2</div>
    <div style={{ width: 50, height: 50, border: '1px solid #000' }}>3</div>
  </Space>
)
```

<!--end-code-->

### Divider

<!--start-code-->

```js
ReactDOM.render(
  <Space gap={4} divider={<div style={{ width: 1, height: 50, backgroundColor: 'red' }}></div>}>
    <div style={{ width: 50, height: 50, border: '1px solid #000' }}>1</div>
    <div style={{ width: 50, height: 50, border: '1px solid #000' }}>2</div>
    <div style={{ width: 50, height: 50, border: '1px solid #000' }}>3</div>
  </Space>
)
```

<!--end-code-->
