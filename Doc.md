# React.jsによる開発の例
React.jsによるフロントエンドの開発例を紹介します。

React.jsの特徴はSPA(Single Page Application)である点です。
ただ一つのHTML(index.html)ファイルをもち、ページの切り替えを必要としません。
例えば以下の画像のように、
signup, signin, signoutの操作をReact.jsで実装する場合を考えます。

- - - 

<img src='./assets/signup.png' style='height: 150px;'/>
<img src='./assets/home.png' style='height: 150px;'/>
<img src='./assets/signin.png' style='height: 150px;'/>

- - -

この際のReact.jsとAPI Serverのフローは以下です。

<img src='./assets/react_and_api.png' style='height: 300px;'/>

React.jsとAPI Serverとの間の通信は`content-type=application/json`のみで行われていることが特徴です。
通常のWebアプリのように、Login成功時/失敗時のページをサーバー側がパースしてHTMLをクライアントに返す必要はありません。
サーバーの仕事はただDatabaseと照合してログインが成功したか失敗したか処理するだけで、ページ遷移の判断はクライアントサイドに押し付けることができます。

React.jsにおいて、ページ遷移の動作はJavaScriptで上書きします。
例えば以下は本デモのJavaScript上のルーティング定義です。

```js
/* src/index.tsx */
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signout' element={<Signout/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/tmpres' element={<TmpReserve/>}/>
          </Routes>
```

React.jsはただひとつのHTMLファイルindex.htmlをもちますが、このHTMLファイルにはページコンテンツを記述しません。
React.jsにおけるコンテンツ表示は常にJavaScriptでDOM(Document Object Model)を操作することによって実現します。

JSX記法により、(htmlを書きなれた人であれば)ごく直感的にJavaScriptからDOMの生成を行うことができます。
例えば以下は`/signin`の例(/src/Signin/View.tsx)。

```js
/* /src/Signin/View.tsx */

const View = (props: Props) => (
  <form className='bg-green'>
    <h1>Login</h1>
    {props.state.errorMsg ? <p>{props.state.errorMsg}</p> : null}
    <div>
      <label>email</label>
      <input
        type={'email'}
        onChange={props.handle.inputEmail}
        value={props.state.email || ''}
      />
    </div>
...
```

波括弧でくくられた部分はJavaScriptの値を埋め込む部分です。
それ以外はほとんど完全にHTML/CSSと同じ記法が使えます。

ページ遷移やAPI Serverとの通信などといった機能部分は純粋なJavaScriptで記述します。

```js
/* /src/Signin/index.tsx */

const Signin = () => {
  const handle = {
    login: () => {
      /* ここにログイン機能・サーバーとのAjax通信などを記述します。 */
    },
  };
  ...
  return <View {...{handle, state, store}}/>;
};
```

React.jsの紹介は以上です。

API Serverとフロントエンドの開発が（APIの設計を通して）完全に役割分けできる点と、
フロントエンドの開発の中でもHTML/CSSを書く人と機能部分を書く人である程度役割できる点が
、チーム開発において良い感じなのでオススメです。

# Firebaseの紹介
SignupやSignout、データのCRUDなど、Webアプリとして改めてコードを書くほどでもないようなありきたりな機能は、ひとまずFirebase（や、同等のBackend as a Service）で実装して、とりあえず動くものを作りながら開発の道筋を探っていくことをおすすめします。

とはいえ、Firebaseには致命的な欠陥もあります。
例えばFirebaseは単なる巨大なJSONファイルなので、トランザクション処理という概念がありません（がんばればできる？）。
あとはPDF自動生成とかもたぶん無理。
いずれにせよ今Firebaseを使うにせよ使わないにせよ、将来はRonRのようなちゃんとしたAPI Serverを作る必要はあると思います。開発チーム全体のスキルの熟達のためにも。
(React.jsからすれば、API Hostまわりを書き換えるだけなのでAPIサーバーが途中で変更になっても大した痛手にはなりません。)

## FirebaseとReact.jsとの接続
Firebaseプロジェクトを作成して、アプリの認証鍵をReact.jsに登録することで通信可能になります。
公式Docsの通り。
```js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: '***',
  authDomain: '***',
  projectId: '***',
  storageBucket: '***',
  messagingSenderId: '***',
  appId: '***',
};

const auth = firebase.auth();
```

## アカウント操作
Ajaxでfirebaseのhttp APIを叩く方法もありますが、Signinなどの「Webアプリあるある」な機能は基本的にライブラリを使って１行で実装できます。
大抵はフォームボタンのクリック時発火イベントと組み合わせて使います。
```js
/* Signup */
auth.createUserWithEmailAndPassword(state.email, state.passwd);

/* Signin */
auth.signInWithEmailAndPassword(state.email, state.passwd);
```

Firebaseのコンソールから確認できます。

<img src='./assets/firebase_auth.png' style='height: 100px;'/>

## CRUD
例えば以下の仮予約機能の実装を考えます。

- - -

<img src='./assets/reserve_before.png' style='height: 200px;'/>
<img src='./assets/reserve_after.png' style='height: 200px;'/>

- - -

Firebaseに限った話ではありませんが、例えば以下のようなJSON `record`をAPIにPOSTすることになるでしょう。

```js
const record = {
  owner: user.email, // 'mtzk.masato@gmail.com'
  createdAt: new Date(),
  dateString: state.checkedDate, // '2022-12-09'
}

firedb
  .collection('tmpReserve')
  .add(record);
```

FirebaseにはDatabaseテーブルという概念はありません。
全ては一つのJSONの一部として扱われます。
先ほどPOSTされたJSON `record`は、その形の通りにFirebaseに登録されます。

<img src='./assets/firebase_store.png' style='height: 120px;'/>

これは一見すると非常に脆弱ですが、度重なるデータスキーマ変更に柔軟に対応できるということでもあります。
プロジェクトの走り出しには、どんなに優れたデータベース定義でも必ず変更されるものです。
そのような段階では特に、このような不定形のデータストアは強力です。

とはいえ、全く無秩序に書けるというわけではなく、Firestore Ruleである程度の制御をします。

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

また、React.js側でも、TypeScriptのinterface定義によって、Firebaseに無秩序にデータが登録されてしまうことを防ぎます。

```typescript
export interface DocTmpReserve {
  owner: string;
  date: string;
  createdAt: firebase.firestore.Timestamp;
};
```

## その他
そのほか、Firebase Functionsでメール送信やリマインダーなどといった大抵のWebアプリにありそうな機能は実装できます。
一方で、先述の通りですがPDF自動生成のような込み入った機能や、10kを超えるような大量の接続に対する高パフォーマンスは望めないでしょう。

- - -

以上です。
