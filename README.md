# Слайдер выбора диапазона дат

Этот проект представляет собой компонент слайдера для выбора диапазона дат. Пользователи могут использовать его для
выбора начальной и конечной даты.

## Установка

1. Клонируйте репозиторий:

   ```
   git clone 
   ```

2. Перейдите в директорию проекта:

   ```
   cd date-range-slider
   ```

3. Установите зависимости:

   ```
   npm i
   ```
   ```
   yarn
   ```

## Использование

Перейдите в App.tsx и измените параметры min и max, передаваемые в ```DateRangeSlider```:

```jsx
import React from 'react';
import DateRangeSlider from './DateRangeSlider';

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <DateRangeSlider min={moment()} max={moment().add(3, "y")} />
    </div>
  );
}

export default App;
```

## Команды

Вы можете использовать следующие команды:

- `npm dev`: Запуск приложения в режиме разработки.

## Структура проекта

- `src/`: Исходный код React-приложения.
- `public/`: Статические ресурсы.
