const btn = document.getElementById('update');

btn.addEventListener('click', () => {
  const arr = [1111, 2222, 3333, 4444, 5555, 6666];
  for (const num of arr) {
    fetch(
      'https://yv6ia79pyj.execute-api.us-east-1.amazonaws.com/dev/transaction',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 'ac3b0fd5-c47e-4c9f-88d9-3df176cf7989',
          textMessage: `${num}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(num, data);
      });
  }
});
