import React, { useCallback, useEffect, useState}  from 'react';
import type { RefObject } from 'react';
import './NumberPlate.css';

export interface NumberPlateProps {
  ref?: RefObject<HTMLDivElement | null>;
  value?: string;
  onChange?: (value: string) => void;
  separate?: string;
  color?: 'white' | 'green' | 'yellow' | 'black';
  disabled?: boolean;
  required?: boolean;
}

const regions = {
  "北海道": ["札幌", "函館", "旭川", "室蘭", "苫小牧", "帯広", "釧路", "北見", "知床"],
  "東北": ["青森", "八戸", "弘前", "盛岡", "平泉", "岩手", "秋田", "山形", "庄内", "仙台", "宮城", "福島", "会津", "郡山", "いわき"],
  "関東": [
    "水戸", "土浦", "つくば",
    "宇都宮", "那須", "日光", "とちぎ",
    "群馬", "前橋", "高崎",
    "大宮", "川口", "川越", "春日部", "越谷", "熊谷", "所沢",
    "千葉", "習志野", "成田", "柏", "袖ヶ浦", "市川", "野田",
    "東京", "品川", "足立", "練馬", "世田谷", "板橋", "江東", "葛飾", "江戸川", "八王子", "多摩",
    "横浜", "川崎", "相模", "湘南"
  ],
  "中部": [
    "新潟", "長岡", "上越",
    "長野", "松本", "諏訪", "南信州", "安曇野",
    "山梨", "富士山",
    "静岡", "沼津", "伊豆", "浜松",
    "名古屋", "尾張小牧", "一宮", "春日井", "豊田", "三河", "岡崎", "豊橋",
    "岐阜",
    "三重", "鈴鹿", "四日市", "伊勢志摩"
  ],
  "近畿": [
    "滋賀", "京都",
    "大阪", "なにわ", "和泉", "堺",
    "神戸", "姫路",
    "奈良",
    "和歌山"
  ],
  "中国": ["鳥取", "島根", "岡山", "倉敷", "広島", "福山", "山口", "下関"],
  "四国": ["徳島", "香川", "高松", "愛媛", "高知"],
  "九州": [
    "福岡", "北九州", "久留米", "筑豊",
    "佐賀",
    "長崎", "佐世保",
    "熊本",
    "大分",
    "宮崎",
    "鹿児島", "奄美",
    "沖縄", "宮古", "八重山"
  ]
};

const convertNumber = (str: string | number): string => {
  str = String(str);
  // 数値以外を削除
  const numericOnly = str.replace(/\D|・|-/g, '');
  if (numericOnly.length === 0) {
    // 数値が含まれていない場合、クリア
    return '';
  } else if (numericOnly.length < 4) {
    // 4文字以下の場合、先頭から残りの文字数を「・」で埋める
    return '・'.repeat(4 - numericOnly.length) + numericOnly;
  } else {
    if (numericOnly.length < 5) {
      // 4文字以上の場合、2桁目と3桁目の間にハイフンを挿入
      return numericOnly.slice(0, 2) + '-' + numericOnly.slice(2);
    }
  }
  return str;
};

const NumberPlate: React.FC<NumberPlateProps> = ({
  ref,
  value = '',
  onChange,
  separate = ' ',
  color = 'white',
  disabled = false,
  required = false
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // modelValueが不完全でも正規化
  useEffect(() => {
    const parts = internalValue.split(separate);
    if (parts.length < 4) {
      const normalized = [...parts, '', '', '', ''].slice(0, 4).join(separate);
      setInternalValue(normalized);
      onChange?.(normalized);
    }
  }, [internalValue, separate, onChange]);

  const plate = {
    $area: internalValue.split(separate)[0] || '',
    $class: internalValue.split(separate)[1] || '',
    $hira: internalValue.split(separate)[2] || '',
    $number: internalValue.split(separate)[3] || ''
  };

  const handleChangeInput = useCallback((key: 'area' | 'class' | 'hira' | 'number', event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let inputValue = event.target.value.replace(/\s/g, '');

    if (key === 'number') {
      inputValue = convertNumber(inputValue) || '';
    }

    const [$area, $class, $hira, $number] = internalValue.split(separate);
    const next = {
      area: $area,
      class: $class,
      hira: $hira,
      number: $number,
      [key]: inputValue
    };

    const newValue = [next.area, next.class, next.hira, next.number].join(separate);
    setInternalValue(newValue);
    onChange?.(newValue);
  }, [internalValue, separate, onChange]);

  return (
    <div ref={ref} className={`number-plate number-plate-${color}`}>
      <div className="number-plate-row">
        <select
          required={required}
          disabled={disabled}
          name="number-plate-area"
          className="number-plate-input number-plate-kanji number-plate-input-area"
          value={plate.$area}
          onChange={(e) => handleChangeInput('area', e)}
        >
          <option label="- 地域 -" value=""></option>
          {Object.entries(regions).map(([region, prefs]) => (
            <optgroup key={region} label={region}>
              {prefs.map((pref) => (
                <option key={pref} label={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <input
          required={required}
          disabled={disabled}
          type="tel"
          placeholder="300"
          maxLength={3}
          name="number-plate-class"
          className="number-plate-input number-plate-number number-plate-input-class"
          value={plate.$class}
          onChange={(e) => handleChangeInput('class', e)}
        />
      </div>

      <div className="number-plate-row">
        <input
          required={required}
          disabled={disabled}
          type="text"
          placeholder="ぬ"
          maxLength={1}
          name="number-plate-hira"
          className="number-plate-input number-plate-hira number-plate-input-hira"
          value={plate.$hira}
          onChange={(e) => handleChangeInput('hira', e)}
        />
        <input
          required={required}
          disabled={disabled}
          type="tel"
          placeholder="12-34"
          maxLength={5}
          name="number-plate-number"
          className="number-plate-input number-plate-number number-plate-input-number"
          value={convertNumber(plate.$number)}
          onChange={(e) => handleChangeInput('number', e)}
        />
      </div>
    </div>
  );
};

export { NumberPlate };
export default NumberPlate;
