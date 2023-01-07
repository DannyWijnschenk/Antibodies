<template>
  <div class="about">
    <p>Beheer gebruikers instellingen en basis tabellen</p>
    <p>Versie 1.0 - 28/11/2022 - (c) UZ Gent</p>
     <font-awesome-icon icon="fa-solid fa-user-secret" />
     <font-awesome-icon icon="fa-solid fa-bicycle" />
     <font-awesome-icon icon="fa-regular fa-pen-to-square" />
     <font-awesome-icon icon="fa-solid fa-user" />
     <button class="btn btn-primary btn-xs" ><font-awesome-icon icon="fa-regular fa-pen-to-square"/></button>
  </div>
    <button @click="this.$toast.show(`Hey! I'm here`);">Toast it!</button> 
</template>

