# 4. 반응속도 체크

## 4-1) React 조건문

### 삼항연산자, 보호연산자

삼항연산자

```javascript
{
  this.state.result.length === 0 ? null : (
    <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
  );
}
```

보호연산자

```javascript
{
  this.state.result.length === 0 && (
    <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
  );
}
```
