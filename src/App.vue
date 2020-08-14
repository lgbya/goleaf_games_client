<template>
    <div id="app" >
        <div >
            <b-navbar toggleable="lg" type="dark" variant="info">
                <b-navbar-brand href="#">GAME</b-navbar-brand>
                <b-navbar-brand href="#" style="margin-right:0px;">
                    <router-link to="/select-game">
                        <button class="btn btn-info " style="font-size:1.1rem">
                            返回
                        </button>
                    </router-link>

                </b-navbar-brand>
            </b-navbar>
        </div>
        <div  class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',

    }
</script>

<style>
    #app{
        max-width: 544px;
        margin:0 auto;
    }
</style>
