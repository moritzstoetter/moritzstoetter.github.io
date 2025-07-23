---
title: "How to Access a Private GitHub Repo from GitHub Actions"
author: "Moritz Stötter"
date: 2025-07-20
image: "../assets/auto_keys.png" # https://docs.astro.build/en/guides/images/#images-in-content-collections
imageAlt: ""
tags: ["CI/CD", "GitHub"]
---


### How to Access a Private GitHub Repo from GitHub Actions

Say you have a GitHub hosted repository named `action_repo` that runs some GitHub actions, and has a submodule that is itself a private repository named `private_repo`. In order for the jobs to be able to access `private_repo` we'll need to grant access to it. Maybe counterintuitively this is true even if `private_repo` and `action_repo` belong to the same GH account. 

#### Create the Deploy Keys

We can use Deploy Keys to grant this access In order to do we so create a key-pair in the name of the entity we are granting access to. In this case that entity is `private_repo`:

```bash
ssh-keygen -t ed25519 -C "it@github.com:account_name/private_repo.git" -f deploy_key -N ""
```

The comment `git@github.com:account_name/private_repo.git` is key here and your **job will fail if** you misconfigure this. Replace `account_name` with the name of the account and `private_repo` with the name of the repo you are granting access to. 

#### Distribute the Deploy Keys

Take *deploy_key.pub* and add it to the deploy keys of `private_repo` (Settings > Deploy Keys). Give it a name that describes the accessing entity, so you'll know later who this grants access to, e.g. *"read access from action_repo"*.  

Take *deploy_key* and add to to the secrets of `action_repo` (Settings > Secrets and variables > Actions). We'll name it “PRIVATE_REPO_DEPLOY_KEY”. 

#### Use the Deploy Keys

Then use this secrets within the GH actions of `action_repo` like this:

```yaml
jobs:
  your-job:
    
    # ...

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Init submodules
        uses: ./.github/actions/init-submodules
        with:
          ssh-private-key: ${{ secrets.PRIVATE_REPO_DEPLOY_KEY }}

    # ...
 
```

Note: These key-pairs are **not reusable**. I.e. you can't reuse the same public key across multiple private dependencies. A distinct key-pair will have to be generated for each private dependency.

[Learn more about deploy keys on GitHub.com](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys)