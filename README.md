# Career Model Monorepo
See
> https://career.model.tools/

for the live website powered by this repository.

Career Model is an interactive career path planner.

This is an early-stage work-in-progress hobby project.

## Development instructions
Use [PowerShell Core 6+](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-6):
```powershell
    pwsh script\bootstrap.ps1
    pwsh script\setup.ps1
    pwsh script\server.ps1
    pwsh script\test.ps1
```
(yes, also on linux or mac)

## Deployment instructions
There's Azure Static Websites automation with a github action that takes any change to the master branch and then builds and deploys it to the main website.

I.e. you don't need to do anything special to deploy.

If you don't want to release to the main website, use a branch other than master :-)

## Planning instructions
There's a kanban board for this project that has some ideas...
> https://github.com/lsimons/career-model/projects/1

...but mostly, we're not doing structured planning yet.

## Commit message conventions
Follow
> https://conventionalcommits.org/

with types:
* build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* docs: Documentation only changes
* feat: A new feature
* fix: A bug fix
* perf: A code change that improves performance
* refactor: A code change that neither fixes a bug nor adds a feature
* revert: undoing (an)other commit(s)
* style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* test: Adding missing tests or correcting existing tests
* improvement: Improves code in some other way (that is not a feat or fix)
* chore: Changes that take care of some other kind of chore that doesn't impact the main code
(based on angular conventions https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)

## License
This software is licended under Apache License v2.0. See [LICENSE](LICENSE.txt).
