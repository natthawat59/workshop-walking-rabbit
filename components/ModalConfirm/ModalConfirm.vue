<template>
  <Modal
    isSmall
    :class="[
      'modal-confirm',
      {
        'is-active': isShow,
        'is-theme-blue': isThemeBlue,
        'is-theme-red': isThemeRed,
        'is-theme-orange': isThemeOrange,
        'is-theme-green': isThemeGreen,
      },
      className,
    ]"
    :style="[inlineStyles]"
    :onBackdrop="onBackdrop"
    :data-test-id="dataTestId"
  >
    <ModalHeader>
      <Grid isSpacebetween isVerticalCenter class="modal-confirm-header">
        <GridCol>
          <span>{{ header }}</span>
        </GridCol>
        <GridCol>
          <Icon
            :icon="
              require('~/static/images/icons/ic-information-outline-white.svg')
            "
            :size="42"
          />
        </GridCol>
      </Grid>
    </ModalHeader>
    <ModalBody>
      <Grid isCenter isDirectionColumn class="modal-confirm-section">
        <GridCol class="is-description">
          {{ description }}
        </GridCol>
        <GridCol v-if="subDescription" class="sub-description">
          {{ subDescription }}
        </GridCol>
      </Grid>
    </ModalBody>
    <ModalFooter isRight>
      <Grid>
        <GridCol>
          <Button
            class="space-button"
            isColorGray
            :width="100"
            :onClick="onClose"
          >
            Close
          </Button>
        </GridCol>
        <GridCol>
          <Button
            :isColorBlue="isThemeBlue"
            :isColorRed="isThemeRed"
            :isColorOrange="isThemeOrange"
            :width="100"
            :onClick="onConfirm"
            :dataTestId="'confirm'"
          >
            Confirm
          </Button>
        </GridCol>
      </Grid>
    </ModalFooter>
  </Modal>
</template>

<script>
import Modal from './../Modal/index.ts';
import Grid from './../Grid/index.ts';
import Icon from './../Icon/index.ts';
import Button from './../Button/index.ts';

export default {
  name: 'ModalConfirm',

  components: {
    Modal: Modal.Modal,
    ModalHeader: Modal.ModalHeader,
    ModalBody: Modal.ModalBody,
    ModalFooter: Modal.ModalFooter,
    Grid: Grid.Grid,
    GridCol: Grid.GridCol,
    Icon: Icon.Icon,
    Button: Button.Button,
  },

  // Props types: String, Number, Boolean, Array, Object, Function, Promise
  props: {
    className: {
      type: String,
    },
    inlineStyles: {
      type: Object,
      default: function () {},
    },
    isShow: {
      type: Boolean,
    },
    onConfirm: {
      type: Function,
      default: function () {},
    },
    onClose: {
      type: Function,
      default: function () {},
    },
    onBackdrop: {
      type: Function,
      default: function () {},
    },
    header: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subDescription: {
      type: String,
    },
    isThemeRed: {
      type: Boolean,
    },
    isThemeBlue: {
      type: Boolean,
    },
    isThemeOrange: {
      type: Boolean,
    },
    isThemeGreen: {
      type: Boolean,
    },
    dataTestId: {
      type: String,
    },
  },

  mounted() {},

  data() {
    return {};
  },

  methods: {
    function_name() {},
  },
};
</script>

<style lang="scss">
@import '~assets/styleguides/styleguides';

.modal-confirm {
  /* Parent style   ------------------------------ */
  /* Children style ------------------------------ */
  .modal-confirm-section {
    text-align: center;
  }

  .modal-confirm-header {
    @include typography-secondary-bold-22;
    background: $color-primary-1;
    color: $color-black;
    width: 100%;
    border-radius: 10px;
    padding: 11px 16px;
  }

  .is-description {
    @include typography-secondary-regular-16;
  }
  .sub-description {
    @include typography-secondary-regular-14;
    color: $color-primary-1;
    margin-top: 8px;
  }

  .space-button {
    margin-right: 8px;
  }

  /* Other component style ----------------------- */
  /* Modifier style ------------------------------ */
  .modal-body-custom {
    padding: 40px 24px;
  }

  &.is-theme-red {
    .modal-confirm-header {
      background: $color-red-3;
    }
    .sub-description {
      color: $color-red-1;
    }
  }

  &.is-theme-blue {
    .modal-confirm-header {
      background: $color-blue-3;
    }
    .sub-description {
      color: $color-blue-1;
    }
  }

  &.is-theme-orange {
    .modal-confirm-header {
      background: $color-orange-1;
    }
    .sub-description {
      color: $color-orange-5;
    }
  }

  &.is-theme-green {
    .modal-confirm-header {
      background: $color-green-4;
    }
    .sub-description {
      color: $color-green-1;
    }
  }
}
</style>
