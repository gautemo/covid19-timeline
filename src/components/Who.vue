<template>
    <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" target="_blank" rel="noopener">
        <p>Get the latest information from the World Health Organization about COVID-19</p>
        <img src="../assets/who.png" alt="WHO logo">
    </a>
</template>

<style scoped>
a{
    display: flex;
    height: 100px;
    width: 450px;
    justify-content: center;
    align-items: center;
    font-style: inherit;
    text-decoration: none;
    color: inherit;
    font-size: 1.1em;
    background: var(--third-color);
    padding-left: 25px;
}

p{
    flex: 1;
}

img{
    object-fit: contain;
    height: 100%;
    margin-left: 20px;
}

@media only screen and (max-width: 800px) {
    a{
        width: 100vw;
        font-size: 1em;
    }
}
</style>