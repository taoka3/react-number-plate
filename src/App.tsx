import { useState } from 'react';
import NumberPlate from './NumberPlate';
import './App.css';

function App() {
  const [plateValue, setPlateValue] = useState('');
  const [color, setColor] = useState<'white' | 'green' | 'yellow' | 'black'>('white');
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="app">
      <h1>React Number Plate Component</h1>
      <p>日本のナンバープレート入力フィールド</p>

      <div className="demo-container">
        <NumberPlate
          value={plateValue}
          onChange={setPlateValue}
          color={color}
          disabled={disabled}
          required={false}
        />
      </div>

      <div className="controls">
        <div className="control-group">
          <label>カラーテーマ:</label>
          <div className="button-group">
            <button
              onClick={() => setColor('white')}
              className={color === 'white' ? 'active' : ''}
            >
              白
            </button>
            <button
              onClick={() => setColor('green')}
              className={color === 'green' ? 'active' : ''}
            >
              緑
            </button>
            <button
              onClick={() => setColor('yellow')}
              className={color === 'yellow' ? 'active' : ''}
            >
              黄
            </button>
            <button
              onClick={() => setColor('black')}
              className={color === 'black' ? 'active' : ''}
            >
              黒
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            無効化
          </label>
        </div>

        <div className="control-group">
          <label>現在の値:</label>
          <code>{plateValue || '(空)'}</code>
        </div>

        <div className="control-group">
          <button onClick={() => setPlateValue('')}>クリア</button>
          <button onClick={() => setPlateValue('品川 300 ぬ 12-34')}>
            サンプルを設定
          </button>
        </div>
      </div>

      <div className="info">
        <h2>使用方法</h2>
        <pre>{`import NumberPlate from './NumberPlate';

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <NumberPlate
      value={value}
      onChange={setValue}
      color="white" // 'white' | 'green' | 'yellow' | 'black'
      disabled={false}
      required={false}
    />
  );
}`}</pre>
      </div>
    </div>
  );
}

export default App;
