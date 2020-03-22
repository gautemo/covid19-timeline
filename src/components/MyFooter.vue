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
                Data source: <a href="https://thevirustracker.com/" target="_blank" rel="noopener">thevirustracker.com</a> (reckon unrecorded incidents exists)
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
    align-items: center;
}

.me{
    flex: 1;
    display: flex;
    align-items: center;
    height: 30px;
}
.createdby{
    margin-right: 5px;
}

a{
    color: inherit;
}
</style>