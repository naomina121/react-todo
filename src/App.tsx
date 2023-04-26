import React, { useState } from 'react';
import './App.css';

const App = () => {
  //型定義する
  type Todo = {
    id: number;
    task: string;
    isDone: boolean;
  };

  // タスクの状態を管理する
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  // 新規でタスクを登録するときの関数
  const handleCreateTask = (tasks: Todo) => {
    setTodos(() => {
      return [
        ...todos,
        { id: tasks.id, task: tasks.task, isDone: tasks.isDone },
      ];
    });
  };

  // // タスクを更新させる時の関数
  const handleUpdateTask = (tasks: Todo) => {
    todos[tasks.id].isDone = tasks.isDone;
    setTodos(() => {
      return [...todos];
    });
  };

  // // タスクを削除させる時の関数
  const handleDelateTask = (tasks: Todo) => {
    // 配列から削除したいIDを指定して削除
    todos.splice(tasks.id, 1);

    //新しい配列を作成してIDを上書きする。
    const setTodoArray: Todo[] = [];

    todos.map((todo, index) => {
      setTodoArray.push({
        id: index,
        task: todo.task,
        isDone: todo.isDone,
      });
    });

    setTodos(() => {
      return [...setTodoArray];
    });
  };

  return (
    <div className="todo">
      <h1>TodoApp</h1>
      {/* タスクがない時の処理 */}
      {todos.length === 0 && <p>登録済みのタスクはないと思うのだ！</p>}

      {/* タスクがある時の処理 */}
      {todos.length > 0 && (
        <div>
          <p>未達成のタスクなのだ</p>
          {todos.map((todo, index) => {
            if (todo.isDone === false) {
              return (
                <div key={index} className="task">
                  <p>タスクID：{todo.id}</p>
                  <p>タスク名：{todo.task}</p>
                  <input
                    type="button"
                    onClick={(e) =>
                      handleUpdateTask({
                        id: todo.id,
                        task: todo.task,
                        isDone: true,
                      })
                    }
                    value="完了したいのだ"
                  />
                  <input
                    type="button"
                    onClick={(e) =>
                      handleDelateTask({
                        id: todo.id,
                        task: todo.task,
                        isDone: false,
                      })
                    }
                    value="削除したいのだ"
                  />
                </div>
              );
            }
          })}
          <p>完了させたタスクは下に入れとくのだ</p>
          {todos.map((todo, index) => {
            if (todo.isDone === true) {
              return (
                <div key={index} className="task">
                  <p>タスクID：{todo.id}</p>
                  <p>タスク名：{todo.task}</p>
                  <input
                    type="button"
                    onClick={(e) =>
                      handleUpdateTask({
                        id: todo.id,
                        task: todo.task,
                        isDone: false,
                      })
                    }
                    value="やっぱり進行中のタスクに戻しておきたいのだ"
                  />
                  <input
                    type="button"
                    onClick={(e) =>
                      handleDelateTask({
                        id: todo.id,
                        task: todo.task,
                        isDone: false,
                      })
                    }
                    value="削除したいのだ"
                  />
                </div>
              );
            }
          })}
        </div>
      )}

      {/* タスクを追加する */}
      <div>
        <p>タスクを追加したいのだ</p>
        <input
          type="text"
          name="task"
          className="mr"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          type="button"
          onClick={() =>
            handleCreateTask({
              id: todos.length,
              task: title,
              isDone: false,
            })
          }
        >
          タスクを登録する
        </button>
      </div>
    </div>
  );
};

export default App;
