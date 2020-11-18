import React, { useState } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, FormGroup, Input, Button, Label, Table} from "reactstrap";
// 参考(https://reactstrap.github.io/components/form/)

export default function App() {
  const [valueName, setValueName] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [valuePw, setValuePw] = useState('');
  const [valueSelect, setValueSelect] = useState('');
  const [valueText, setValueText] = useState('');
  // リスト一覧として表示させるためにusestateで状態を管理
  // usestateは更新するためのhook。ここでは、todosを初期引数として受け取り、setTodoで更新する。
  const [todos, setTodo] = useState([]);

  const addTodo = text =>{
    // スプレッド演算子(...)を使って、todosの中身を前から順番に受け取り、
    // さらに右側のtextに入ったvalueを追加したものをnewTodoに入れる
    const newTodo =[...todos, text];
    // 状態を更新するための関数settodoを呼び、新しく状態を更新させたnewTodoを入れることで状態が変わる
    setTodo(newTodo);
    console.log(newTodo, "配列の中身");
  };

  // submitするとまずこれが走る
  const handleSubmit = e=>{
    // 画面が遷移しないようにpreventDefault
    e.preventDefault();

    // 送信した内容が届いているか確認
    // console.log(valueName, "名前");
    // console.log(valueEmail, "メール");
    // console.log(valuePw, "パスワード");
    // console.log(valueSelect, "会員種別");
    // console.log(valueText, "Todo");
    // 現在の日時取得
    const now =new Date();
    const time =`${now.getMonth()}月${now.getDate()}日 ${now.getHours()}:${now.getMinutes()}`
    // reactではobjectは渡せないので、配列で
    // 送信した内容をひとまとまりにしてvalueAllに渡す
    const value = [
      valueName,
      valueEmail,
      valuePw,
      valueSelect,
      valueText,
      time
  ];
    // 送信した状態をみるにはvalueをconsole
    console.log(value, "valueまとめ");
    // addTodoを実行するとvalueがtextに入ってtodosの配列にどんどん追加
    addTodo(value);
    // 入力欄をクリア
    setValueName("");  
    setValueEmail(""); 
    setValuePw(""); 
    setValueSelect(""); 
    setValueText(""); 
  };
  // 削除処理
  const removeTodo = (index) => {
    const newTodo = [...todos];
    // spliceは配列から要素を削除または追加して組み替える。配列名.splice(追加または削除する位置, 削除する数, 追加する要素)
    newTodo.splice(index, 1);
    setTodo(newTodo);
  };

  // todo表示処理
  const todoEvent = (index) => {
    // console.log("マウスオーバー", index);
    const idname = "todo" + index;
    const cls = document.getElementById(idname).classList[0];
    // console.log(cls);
    if (cls==="hidden"){
      document.getElementById(idname).classList.remove("hidden");
    }if (cls===undefined){
      document.getElementById(idname).classList.add("hidden");
    }
  }

return (
  <div className="App">
    <h1>To do リスト</h1>
    <Container>
    <Form onSubmit={handleSubmit}>
      
      <FormGroup>
        <Label for="name">名前</Label>
      {/* usestateの中身がvalue（変数）に入って、それにsetvalueの処理をする（eventの入れ物の中に入っていく） */}
      {/* onChangeを入れないと、変更できない（readonly）になってしまう */}
        <Input required type="text" name= "name" placeholder="名前を入力してください" value={valueName} onChange={e => setValueName(e.target.value)}/> 
      </FormGroup>

      <FormGroup>
        <Label for="email">メールアドレス</Label>
      {/* usestateの中身がvalue（変数）に入って、それにsetvalueの処理をする（eventの入れ物の中に入っていく） */}
        <Input required type="email" name= "email" placeholder="メールアドレスを入力してください" value={valueEmail} onChange={e => setValueEmail(e.target.value)}/> 
      </FormGroup>

      <FormGroup>
        <Label for="password">パスワード</Label>
      {/* usestateの中身がvalue（変数）に入って、それにsetvalueの処理をする（eventの入れ物の中に入っていく） */}
        <Input required type="password" name= "password" placeholder="パスワードを入力してください" value={valuePw} onChange={e => setValuePw(e.target.value)}/> 
      </FormGroup>

      <FormGroup>
        <Label for="select">会員種別</Label>
        <Input required type="select" name="select" value={valueSelect} onChange={e => setValueSelect(e.target.value)}>
          <option hidden>会員種別を選択してください</option>
          <option value="A会員">A会員</option>
          <option value="B会員">B会員</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="text">To do</Label>
        <Input required type="textarea" name="text" placeholder="To doを入力してください" value={valueText} onChange={e => setValueText(e.target.value)}/>
      </FormGroup>

      <Button type="submit" color="primary" className="submit">送信</Button>
    </Form>
    </Container>

    {/* リスト表示ロジック */}
    <Container>
      <Table>
        <tbody>
          {/* todosがある時のみ処理を実行＆＆（論理演算子） */}
          {/* mapは新しく処理をしたのちに新しい配列で返してくれる */}
          { todos &&
            todos.map((todo, index) => (
            <div key={index}>
              <tr>
                <th className="list" onClick={() => todoEvent(index)}>{todo[0]}さんのTo do（{todo[5]}）</th>
                <td>
                    <Button color="danger" onClick={() => removeTodo(index)}>
                      削除
                    </Button>
                  </td>
              </tr>
              <tr className="hidden" id={`todo${index}`}>
                {todos[index][4]}
              </tr>
            </div>
          ))}
        </tbody>
      </Table>
    </Container>
  </div>
);
}
