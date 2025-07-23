---
title: "Wie man von GitHub-Actions auf ein privates GitHub-Repository zugreift"
author: "Moritz Stötter"
date: 2025-07-20
image: "../assets/auto_keys.png" # https://docs.astro.build/en/guides/images/#images-in-content-collections
imageAlt: ""
tags: ["CI/CD", "GitHub"]
---


### Wie man von GitHub-Aktionen auf ein privates GitHub-Repository zugreift

Nehmen wir an, Sie haben ein von GitHub gehostetes Repository mit dem Namen `action_repo`, das einige GitHub-Aktionen ausführt und ein Submodul hat, das selbst ein privates Repository mit dem Namen `private_repo` ist. Damit die Jobs auf `private_repo` zugreifen können, müssen wir ihnen Zugriff darauf gewähren. Dies ist sogar dann der Fall, wenn `private_repo` und `action_repo` zum selben GH-Konto gehören.

#### Erstellen der Deploy-Schlüssel

Wir können Deploy Keys verwenden, um diesen Zugriff zu gewähren. Dazu erstellen wir ein Schlüsselpaar mit dem Namen der Entität, zu der wir Zugriff gewähren wollen. In diesem Fall ist diese Entität `private_repo`:

```bash
ssh-keygen -t ed25519 -C "it@github.com:account_name/private_repo.git" -f deploy_key -N ""
```

Der Kommentar `git@github.com:account_name/private_repo.git` ist hier der Schlüssel und Ihr **Job wird fehlschlagen, wenn** Sie dies falsch konfigurieren. Ersetzen Sie `account_name` durch den Namen des Kontos und `private_repo` durch den Namen des Repos, auf das Sie Zugriff gewähren wollen.

#### Verteilung der Deploy-Schlüssel

Fügen Sie *deploy_key.pub* zu den Deploy-Schlüsseln von `private_repo` hinzu (Einstellungen > Deploy-Schlüssel). Geben Sie ihm einen Namen, der die zugreifende Entität beschreibt, damit Sie später wissen, wem Sie damit Zugriff gewährt haben, z.B. *„read access from action_repo“*.

Fügen Sie *deploy_key* zu den Secrets von `action_repo` hinzu (Einstellungen > Secrets und Variablen > Actions). Wir werden ihn "PRIVATE_REPO_DEPLOY_KEY" nennen.

#### Verwendung der Deploy-Schlüssel

Dann verwenden Sie dieses Geheimnis innerhalb der GH-Aktionen von `action_repo` wie folgt in `ci.yml`:

```yaml

# ... 

jobs:
  your-job:
    
    # ...

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Init submodules
        uses: webfactory/ssh-agent@v0.5.4
        with:
          ssh-private-key: ${{ secrets.PRIVATE_REPO_DEPLOY_KEY }}

    # ...
 
```

Hinweis: Diese Schlüsselpaare sind **nicht wiederverwendbar**. D.h. Sie können denselben öffentlichen Schlüssel nicht für mehrere private Abhängigkeiten wiederverwenden. Für jede private Abhängigkeit muss ein eigenes Schlüsselpaar erzeugt werden.

[Mehr über Deploy-Schlüssel erfahren auf GitHub.com](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys)