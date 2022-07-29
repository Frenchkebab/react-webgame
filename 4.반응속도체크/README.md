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

## 4-4) 반응속도체크 Hooks로 전환하기

`state` 대신에 `useRef`를 사용하면 re-rendering을 막을 수 있다!

주의) 접근 시 항상 `.current`를 붙여줘야 함!

## 4-5) JSX 내부에 for과 if 쓰기

```javascript
{() => {
  if(result.length === 0) {
    return null;
  } else {
    return ..
  }
}();}
```

근데 이렇게 하느니 그냥 함수로 따로 빼는 것이 나음 ㅋㅋ;
(제일 좋은 것은 자식 component로 만드는 것!)
