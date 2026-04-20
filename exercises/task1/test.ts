// Exercise 1

// console.log(1)

// setTimeout(() => console.log(2), 0)

// console.log(3)


//Exercise 2
// console.log(1)

// Promise.resolve().then(() => console.log(2))

// console.log(3)


//Exercise 3
// console.log(1)

// setTimeout(() => console.log(2), 0)

// Promise.resolve().then(() => console.log(3))

// console.log(4)

//Exercise 4
// console.log(1)

// setTimeout(() => console.log(2), 0)

// Promise.resolve().then(() => {
//   console.log(3)
//   setTimeout(() => console.log(4), 0)
// })

// console.log(5)

//Exercise 5
// console.log(1)

// queueMicrotask(() => console.log(2))

// Promise.resolve().then(() => console.log(3))

// setTimeout(() => console.log(4), 0)

// console.log(5)

//Exercise 6

// console.log(1)

// Promise.resolve().then(()=>{
//   setTimeout(()=>{console.log(2)},0)
//   queueMicrotask(()=>{
//     console.log(3)
//     queueMicrotask(()=>{
//       console.log(4)
//     })
//   })
//   console.log(5)
// })

// setTimeout(()=>{
//   console.log(6)
//   Promise.resolve().then(()=>{
//     queueMicrotask(()=>{
//       console.log(7)
//     })
//     console.log(8)

//   })
// },0)

// console.log(9)