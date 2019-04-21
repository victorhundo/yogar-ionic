# Ionic de Yogar

## Yogar

O Yogar vem com o intuito de ajudar brasileiros com faixa etária a partir de 14 anos  que não possuem tempo ou condições de se deslocar para realizar atividades físicas em escolas ou academias, e que tenham interesse no estilo de vida que a filosofia do Yoga proporciona.

## Dependências
1 – Instalar o Node.js
  ```
  sudo apt-get install python-software-properties
  curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
  sudo apt-get install nodejs
  ```
2 – Instalar o Cordova

  ```
  sudo npm install -g cordova
  ```
3 - Instalar Ionic

  ```
  sudo npm install -g ionic
  ```

## Dependências
 Para executar o ionic, entrar na pasta yogar/ e fazer:

 ```
  ionic serve
  ```

```
ionic serve
```
## Criando Plataforma Android

Para criar:

  ```
  ionic cordova platform add android

  ```


Buildando o android
 versao debug

 ```
 ionic cordova build android
 ```

 versao normal mais rapida
  ```
  ionic cordova build android --prod
  ```
  executar applicativo
  ```
  ionic cordova run android
  ```

## Dependências Android

1 -Install Android SDK
  ```
  sudo apt-get install android-sdk
  ```
