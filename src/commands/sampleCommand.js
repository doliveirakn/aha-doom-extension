aha.on("sampleCommand", ({ record }, { identifier, settings }) => {
  debugger;
  console.log("Hello from command!")
  // if (record) {
  //   aha.commandOutput(
  //     `Running sample command for record: ${record.typename} / ${record.referenceNum}.`
  //   );
  // } else {
  //   aha.commandOutput(`Running sample command without a record.`);
  // }
});
