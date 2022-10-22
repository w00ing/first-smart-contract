import { ethers } from "hardhat";
import { WavePortal } from "../typechain-types/WavePortal";

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", accountBalance.toString());

  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = (await waveContractFactory.deploy()) as WavePortal;

  await waveContract.deployed();

  console.log("WavePortal address:", waveContract.address);
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
