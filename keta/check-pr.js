const { execSync } = require('child_process');

const lastCommitSha = 'last-commit-sha'; // replace with the last commit SHA

function getPrSha() {
  try {
    // Get the branch name of the last commit
    const branchName = execSync(`git branch --contains ${lastCommitSha}`).toString().trim();

    // Get the SHA of the last commit on the branch
    const prSha = execSync(`git rev-parse ${branchName}`).toString().trim();

    console.log('PR SHA:', prSha);
  } catch (error) {
    console.error('Error getting PR SHA:', error);
  }
}

getPrSha();
