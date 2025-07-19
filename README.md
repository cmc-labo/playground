## **Rust Playground**
Enter Rust code in the Monaco Editor, it is compiled on the server side and the results are displayed in the browser.

Because running arbitrary code on a server is extremely dangerous, we use Docker to restrict and sandbox execution, and also implement execution time and memory limits, as well as input code inspection.


## **Setup**
To run it, you need to have Docker & Node.js installed on your server.
```bash
$ sudo apt install dos2unix
$ dos2unix rust-runner.sh
$ chmod +x rust-runner.sh
$ sudo docker build -t rust-runner .
$ node server.js
```

<p align="center">
    <img alt="playground" src="https://hpscript.s3.ap-northeast-1.amazonaws.com/playground.png" width="100%" />
</p>