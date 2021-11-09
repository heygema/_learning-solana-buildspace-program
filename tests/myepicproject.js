// const anchor = require('@project-serum/anchor');

// describe('myepicproject', () => {

//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.Provider.env());

//   it('Is initialized!', async () => {
//     // Add your test here.
//     const program = anchor.workspace.Myepicproject;
//     const tx = await program.rpc.initialize();
//     console.log("Your transaction signature", tx);
//   });
// });

const anchor = require('@project-serum/anchor');
const {SystemProgram} = anchor.web3;

const main = async () => {
  console.log('Starting test...');

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Myepicproject;

  // create an account keypair
  const baseAccount = anchor.web3.Keypair.generate();

  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log('Your transaction signature ...', tx);

  // Fetch data from the account.
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('GIF Count >>>', account.totalGifs.toString());

  await program.rpc.addGif({
    accounts: {
      baseAccount: baseAccount.publicKey,
    },
  });

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('(Updated) GIF Count >>>', account.totalGifs.toString());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
