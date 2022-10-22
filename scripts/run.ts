import { ethers } from "hardhat";
import { GetContractTypeFromFactory } from "../typechain-types/common";
import { WavePortal__factory } from "../typechain-types/factories/WavePortal__factory";
import { WavePortal } from "../typechain-types/WavePortal";

const main = async () => {
  const [owner, randomPerson] = await ethers.getSigners();
  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = (await waveContractFactory.deploy()) as WavePortal;
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  // How can I get typed contract instance here?
  await waveContract.getTotalWaves();

  const firstWaveTxn = await waveContract.wave();
  await firstWaveTxn.wait();

  const s = await waveContract.getTotalWaves();

  const secondWaveTxn = await waveContract.connect(randomPerson).wave();

  await secondWaveTxn.wait();

  await waveContract.getTotalWaves();
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
