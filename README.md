
## 資料庫設定
1. 先安裝MySQL
2. 設定MySqL與後端的連接，找到 backend\src\main\resources\application.properties 這個檔案


```
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=1234

```



## 後端設定
1. 先確定有安裝Java和gradle
```
java -v
gradle -v
```

2. 到backend資料夾，執行cmd
```
gradle bootRun
```

## 如何登入後端(透過localhost:8080)
1. 找到設定檔 backend\src\main\resources\application.properties 
2. 修改以下內容，如果要修改密碼的話可以透過main.java去輸入
```
spring.security.user.name=Admin
# password: 1234
spring.security.user.password=$2a$10$Xb1h.NPwrIXCcOhn/zT2n.xRbplUyZLEaN.az2/McNadJTBNv9226
```

## 前端設定
1. 先確定有安裝node.js 和 npm，打開cmd，輸入以下指令確認
```
node -v
npm -v
```


2. 到Frontend的資料夾，打開terminal

```
npm install
```

3. 執行frontend
```
npm start
```

# 資料模型變更說明

## Teacher

| 欄位名稱 | 類型   | 狀態               | 備註                |
|----------|--------|--------------------|---------------------|
| id       | String | 不變                |                     |
| name     | String | 不變                |                     |
| password | String | 不變                |                     |
| color    | String | 重新命名為 `theme` |                     |
| theme    | String | 新增                | 替代 `color` 欄位    |

---

## Homework

| 欄位名稱           | 類型               | 狀態     | 備註                                |
|--------------------|--------------------|----------|-------------------------------------|
| id                 | long               | 不變     |                                     |
| homeworkName       | string             | 不變     |                                     |
| pdf                | longbob            | 不變     | **注意**: 確認是否為 `longblob`      |
| startTime          | Date               | 不變     |                                     |
| endTime            | Date               | 不變     |                                     |
| average            | float              | 不變     |                                     |
| contest            | Contest            | 刪除     |                                     |
| styleChecks        | StyleCheck         | 刪除     |                                     |
| styleCheckResult   | StyleCheckResult   | 刪除     |                                     |
| score              | float              | 新增     |                                     |
| answer             | ???                | 新增     | 需確認欄位類型                        |

---

## Student

| 欄位名稱          | 類型    | 狀態                | 備註                     |
|-------------------|---------|---------------------|--------------------------|
| id                | long    | 不變                 |                          |
| password          | string  | 不變                 |                          |
| name              | string  | 不變                 |                          |
| color             | string  | 重新命名為 `theme`  |                          |
| styleCheckResults | List [] | 刪除                |                          |
| theme             | string  | 新增                 | 替代 `color` 欄位         |

---

## Contest

| 欄位名稱      | 類型   | 狀態                   | 備註                          |
|---------------|--------|------------------------|-------------------------------|
| id            | long   | 不變                    |                               |
| contestName   | string | 不變                    |                               |
| totalScore    | int    | 不變                    |                               |
| startTime     | Date   | 刪除                   |                               |
| endTime       | Date   | 刪除                   |                               |
| homeworks     | list[] | 刪除                   |                               |
| name          | string | 新增                    |                               |
| totalscore    | int    | 修改為 `int`           | 確認是否需要修改型別或名稱       |
| timelimit     | ???    | 新增                    | 需確認欄位類型                      |
| conestName    | string | 新增且設為主鍵 (`key`) | **注意**: 可能為 `contestName` 的拼寫錯誤 |
| s_id          | long   | 新增                    |                               |
| question_score| list[] | 新增                    |                               |
| totalScore    | double | 修改為 `double`       | 確認是否為同一欄位的型別變更       |
| source_code   | string | 新增                    |                               |

---

## StudentHomeworkBox

| 欄位名稱          | 類型   | 狀態                         | 備註                           |
|-------------------|--------|------------------------------|--------------------------------|
| id                | long   | 不變                           | 主鍵                           |
| homeworkName      | string | 不變                           |                                |
| scores            | list[] | 不變                           |                                |
| sourceCode        | String | 不變                           |                                |
| result            | string | 重新命名為 `console_result` |                                |
| homeworkBoxName   | string | 新增                           |                                |
| hoemwork_id       | long   | 新增                           | **注意**: `homework_id` 的拼寫錯誤  |
| console_result    | string | 修改名稱                       | 替代 `result` 欄位               |
| score             | list[] | 不變                           |                                |
| function_contain  | ???    | 新增                           | 需確認欄位類型                       |

---

## ContestBox

| 欄位名稱       | 類型   | 狀態                        | 備註                            |
|----------------|--------|-----------------------------|---------------------------------|
| id             | long   | 不變                          | 主鍵                            |
| contest_name   | string | 不變                          |                                 |
| totalScore     | double | 不變                          | **注意**: 與 `Contest` 實體的 `totalScore` 類型不同 (int vs double) |
| questionscore  | list[] | 不變                          |                                 |
| conestName     | string | 新增且設為主鍵 (`key`)       | **注意**: 可能為 `contestName` 的拼寫錯誤 |
| s_id           | long   | 新增                          |                                 |
| question_score | list[] | 新增                          |                                 |
| source_code    | string | 新增                          |                                 |
