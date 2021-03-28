<template>
    <footer>
        <div class="content">
            <p class="me">
                <span class="createdby">Created by: Gaute Meek Olsen</span>
                <Twitter />    
                <GitHub />
                <Portofolio size="20" />
            </p>
            <p>
                Data source: <a href="https://corona.lmao.ninja/docs" target="_blank" rel="noopener">corona.lmao.ninja/docs</a> (reckon unrecorded incidents exists)
            </p>
        </div>
    </footer>
</template>

<script>
import Twitter from './icons/Twitter';
import GitHub from './icons/GitHub';
import Portofolio from './icons/Portofolio';

export default {
  components: {
    Twitter,
    GitHub,
    Portofolio,
  }
}
</script>

<style scoped>
footer{
    background: var(--main-color);
    padding: 0 25px;
    color: var(--white);
}

.content{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.me{
    flex: 1;
    display: flex;
    align-items: center;
    height: 30px;
    white-space: nowrap;
}
.createdby{
    margin-right: 5px;
}

a{
    color: inherit;
}

@media only screen and (max-width: 800px) {
    p{
        margin: 3px;
    }
}
</style>