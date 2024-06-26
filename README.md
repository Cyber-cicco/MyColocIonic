# MyColoc

## Introduction

Application dont de gestion de sa colocation.

Dans la vie en colocation, nous sommes amenés à vivre des situations de vie commune très spécifique à ce format de façon répétée.

Que ce soit organiser des soirées, organiser des soirées jeux de société, savoir si une personne va bien quand elle rentre tard, s'organiser pour acheter de la nourriture pour un repas, organiser un anniversaire...

On utilise souvent pour cela un groupe whats'app, messenger ou insta, mais tout n'est pas aussi accessible et facile à faire qu'avec une application dédiée pour cela. On utilise par exemple la localisation snapchat pour savoir si une personne va bien ou non, on s'organise par message pour savoir qui prend quoi pour une soirée mais on ne sait plus ensuite qui a dit quoi, on est obligé de créer des nouvelles conversations lorsque l'on organise des événements surprises, on utilise chacun sa propre appli de gestion de budget et de paiement pour les cas où des gens achètent de la nourriture pour tel événement et on se plus qui doit quoi à qui...

Intervient donc MyColoc, l'application qui permet de gérer tout cela de façon centralisée, que n'importe qui peut utiliser pour gérer sa coloc, mais également briser la glace dans une coloc de personnes qui ne se connaissent que peu en proposant des activités.

## VO.1.0

Le but est d'avoir, pour la première version:
 * une page pour les utilisateurs non connectés où l'on peut soit créer un nouveau groupe soit en rejoindre un si on a reçu une invitation (bonus avec un backend)
 * une page de profil où l'on peut choisir un avatar, renseigner son nom, prénom et son pseudonyme. Doit être persisté en hors ligne et synchronisé s'il y a un backend.
 * une page événements où l'on peut créer un événement qui sera persisté dans le stockage local de l'appareil. Lorsque l'événément est terminé, il est possible de le push vers un serveur (s'il y a un backend). On peut choisir le type de l'événement, sa localisation, et une liste de choses nécessaires à amener pour l'événement.
 * une page qui permet la géolocalisation et de partager sa position avec ses colocataires.

Avec un backend :
 * une page où l'on peut créer un groupe et envoyer des invitations à des numéros de téléphone donnés.
 * éventuellement une page du groupe de la coloc avec un chat si l'on arrive à mettre en place un backend.
 * éventuellement une page où l'on peut créer un événement unique et un calendrier des événements.

## Installer : 

Remplacer l'attribute apiKey dans environnement.ts et envirionnement.prod.ts par votre clé personnel

Si l'on cherche à construire l'appli pour android il faut également rentrer la clé API dans le manifestAndroid.xml à la place de `YOUR_API_KEY`

## Ce qui est disponible

 * Une page de profil où l'on peut renseigner nom, prénom et pseudonyme, et peut être persisté hors ligne.
 * Une page événements où l'on peut créer un événement qui sera persisté dans le stockage local de l'appareil. On peut choisir le nom de l'événement, sa date et sa localisation. On peut observer les événements à venir sur cette même page

 ## Ce qui aurait pu mais n'a pas été
 * une page pour les utilisateurs non connectés où l'on peut soit créer un nouveau groupe soit en rejoindre un si on a reçu une invitation (bonus avec un backend)
 * le backend
 * une page qui permet la géolocalisation et de partager sa position avec ses colocataires.
