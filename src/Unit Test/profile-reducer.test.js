import profileReducer, { addPostActionCreater, deletePost } from "../redux/reducer/profile-reducer";
import React from 'react'

let state = {
    postsData : [
        { id: 1, message: "это 1 пост" },
        { id: 2, message: "это 2 пост" },
        { id: 3, message: "это 3 пост" },
        { id: 4, message: "это 4 пост" },
        { id: 5, message: "это 5 пост" }
    ]
}

test('Test №1: New Post should be added, and length should be incremented ', () => {
   // 1. исходные данные data
   let action = addPostActionCreater("My test case");
   // 2. action тест кейс (тут пуш нового сообщения)
   let newProfileReduserState = profileReducer(state,action);
   // 3. expectation (ожидание)
   expect(newProfileReduserState.postsData.length).toBe(6);
})

test('Test №2: Post should be equal post what we added ', () => {
   // 1. исходные данные data
   let action = addPostActionCreater("My test case");
   // 2. action тест кейс (тут пуш нового сообщения)
   let newProfileReduserState = profileReducer(state,action);
   // 3. expectation (ожидание)
   expect(newProfileReduserState.postsData[5].message).toBe("My test case");
})

// проба создать тест кейс для несуществующей функции в логике
test('Test №3: After delete post length should be decrement', () => {
    // 1. исходные данные data (удалить пост с айди 1)
    let action = deletePost(1);
    // 2. action тест кейс (тут пуш нового сообщения)
    let newProfileReduserState = profileReducer(state,action);
    // 3. expectation (ожидание)
    expect(newProfileReduserState.postsData.length).toBe(4);
 })

 test(`Test №4: After delete post length shouldn't be decrement if id is inccorrect`, () => {
    // 1. исходные данные data (удалить пост с айди 1)
    let action = deletePost(1000);
    // 2. action тест кейс (тут пуш нового сообщения)
    let newProfileReduserState = profileReducer(state,action);
    // 3. expectation (ожидание)
    expect(newProfileReduserState.postsData.length).toBe(5);
 })