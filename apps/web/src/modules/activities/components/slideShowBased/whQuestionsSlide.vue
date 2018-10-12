<template>
    <div>
        <div class="full-height table">
            <div class="cell">
                <div class="cell-content">
                    <slot></slot>
                    <div v-if="hasQuestions" class="wh-question" @click="changeQuestion">
                        <div class="text_refresh_wrapper">
                            <span class="refresh_icon">
                                <i class="material-icons meaningRefresh"> cached </i>
                            </span>
                            <span class="spanFade meaningSpanFade">{{currentQuestion}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import BaseComponent from '../../../common/components/baseComponent.vue';
import { PremiumCollectionLayout, ImageType } from '../../store/types';
import { Power1 } from 'gsap';

import TimelineMax from 'gsap';
const timeLineMax = TimelineMax as any;

@Component
export default class WhQuestionsSlide extends BaseComponent {
  @Prop()
  public hasQuestions?: boolean;
  @Prop()
  public questions?: string[];

  private currentQuestion?: string;
  private transitionEnded = true;

  public created() {
    this.getNextQuestion();
  }
  public getNextQuestion() {
    if (this.questions && this.questions.length > 0) {
      this.currentQuestion = this.questions.shift();
    }
  }

  public changeQuestion() {
    if (!this.transitionEnded) {
      return;
    }

    const elemrefresh = document.getElementsByClassName('meaningRefresh');
    const elemFadingWord = document.getElementsByClassName('meaningSpanFade');

    this.transitionEnded = false;
    timeLineMax.set(elemrefresh, {
      transform: 'rotate(180deg)',
      autoAlpha: 0.5
    });
    timeLineMax.to(elemFadingWord, 0.5, {
      autoAlpha: 0,
      ease: Power1.easeOut,
      onComplete: () => {
        timeLineMax.set(elemrefresh, {
          transform: 'rotate(0deg)',
          autoAlpha: 1
        });
        this.getNextQuestion();
        timeLineMax.to(elemFadingWord, 0.5, {
          autoAlpha: 1,
          ease: Power1.easeOut,
          onComplete: () => {
            this.transitionEnded = true;
          }
        });
      }
    });
  }
}
</script>



<style scoped lang="scss">
.object-fit_contain {
  object-fit: contain;
}
.full-height {
  height: 100%;
  background: #f8f8f8;
}
.table {
  display: table;
  width: 100%;
  position: relative;
  background: transparent !important;
}

.cell {
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  text-align: center;
  .cell-content {
    position: relative;
    max-height: 100vh !important;
  }
}

.wh-question {
  cursor: pointer;
  position: absolute;
  padding: 7px 55px 1px 100px;
  color: white;
  bottom: 16px;
  left: 0;
  text-align: left;
  box-sizing: border-box;
  font-size: 18px;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  .text_refresh_wrapper {
    display: inline-block;
    position: relative;
    min-width: 150px;
  }
  span {
    font-size: 24px;
    min-width: 150px;
    display: inline-block;
    float: left;
    line-height: 32px;
    padding-left: 80px;
  }
  .refresh_icon {
    position: absolute;
    top: -7px;
    left: 0;
    width: 40px;
    min-width: 55px;
    background: #000000;
    margin-right: 0;
    padding-left: 0;
  }
  i {
    font-size: 32px;
    float: right;
    margin: 0 10px;
    margin: 8px 10px;
    transition: all 0.5s;
  }
}
</style>
