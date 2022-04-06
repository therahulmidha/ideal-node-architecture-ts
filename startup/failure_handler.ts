export function handleFailures() {
  process.on("uncaughtException", (err) => {
    console.log(err);
    // write any mail logic to people who should know that server has stopped
    process.exit(-1);
  });

  process.on("unhandledRejection", (err) => {
    console.log(err);
    // write any mail logic to people who should know that server has stopped
    process.exit(-1);
  });
}
