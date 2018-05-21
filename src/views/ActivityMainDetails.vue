<template>
    <v-layout row class="ex-activity-main-details">
        <v-flex class="hidden-sm-and-down mr-4">
            <div class="ex-cover-image-wrapper">
                <img src="../../public/img/coverDemo.png" alt="img" width="100%" height="100%">
            </div>
        </v-flex>
        <v-flex>
            <h2>Card Deck Name</h2>
            <p>This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)</p>
            <v-layout row justify-space-around class="text-xs-center">
                <v-flex>
                   <p class="mb-1">18 Slides</p>
                    <i class="ex-slides"></i>
                </v-flex>
                <v-flex>
                   <p class="mb-1">Video based</p>
                    <i class="ex-play-video"></i>
                </v-flex>
                <v-flex>
                    <p class="mb-1">Landscape</p>
                    <i class="ex-landscape"></i>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    export default {
        name: 'ActivityMainDetails',
    };
</script>

<style lang="scss">
    .ex-activity-main-details{
        .ex-cover-image-wrapper{
            width: 400px;
            height: 200px;
            img{
                object-fit: cover;
            }
        }
        .ex-slides{
            width: 20px;
            height: 20px;
            display: inline-block;
            background-image: url(../../public/img/icons/slides.png);
            -webkit-background-size: contain;
            background-size: contain;
        }
        .ex-play-video{
            width: 20px;
            height: 20px;
            display: inline-block;
            background-image: url(../../public/img/icons/videoPlay.png);
            -webkit-background-size: contain;
            background-size: contain;
        }
        .ex-landscape{
            width: 20px;
            height: 20px;
            display: inline-block;
            background-image: url(../../public/img/icons/landscape.png);
            -webkit-background-size: contain;
            background-size: contain;
            -webkit-transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            transform: rotate(90deg);
        }
    }
</style>
