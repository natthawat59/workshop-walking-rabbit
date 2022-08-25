<template>
  <Panel isFluidVertical isContentTertiary isHeadingTertiary :heading="''">
    <Container>
      <div class="playground">
        <div class="playground-section is-heading-component">
          <div class="playground-text is-heading-component">Product Detail</div>
        </div>
        <div class="playground-lists is-components">
          <div class="playground-list">
            <div class="playground-section is-heading-component">
              <Grid isGutter30>
                <GridCol>
                  <div class="playground-section is-heading-variant">
                    <div class="playground-text">Product name</div>
                  </div>
                </GridCol>
                <GridCol>
                  <Input
                    :width="250"
                    :placeholder="'product name'"
                    :name="'product name'"
                    v-model="productData.name"
                    :onChangeInput="function () {}"
                  />
                </GridCol>
              </Grid>
            </div>
            <div class="playground-section is-heading-component">
              <Grid isGutter30>
                <GridCol>
                  <div class="playground-section is-heading-variant">
                    <div class="playground-text">Description</div>
                  </div>
                </GridCol>
                <GridCol>
                  <Textarea
                    :width="250"
                    :name="'Description'"
                    v-model="productData.description"
                    :onChangeInput="function () {}"
                  />
                </GridCol>
              </Grid>
            </div>
            <div class="playground-section is-heading-component">
              <Grid>
                <Gridcol>
                  <div class="playground-section is-heading-variant">
                    <div class="playground-text">Status</div>
                  </div>
                </Gridcol>
                <GridCol>
                  <Select
                    :width="250"
                    :placeholder="'Select option'"
                    :options="[
                      { name: 'Active', value: 'Active' },
                      { name: 'Inactive', value: 'Active' },
                    ]"
                    v-model="status"
                  />
                </GridCol>
              </Grid>
            </div>
          </div>
        </div>
      </div>

      <div class="playground-section is-heading-component">
        <Button
          isColorBlue
          :width="100"
          :onClick="onClickEdit.bind(this, productData)"
          >Submit</Button
        >
        <Button isColorRed :width="100">Cancel</Button>
      </div>
    </Container>

    <ModalConfirm
      isShow
      isThemeBlue
      v-if="isOpenEditProductModal"
      :onBackdrop="onCloseEditProductModal"
      :onConfirm="onClickEditModal"
      :onClose="onCloseEditProductModal"
      header="Confirm to Send Request"
      description="Please confirm send request to edit."
    />
  </Panel>
</template>

<script>
import Components from '~/components/index.ts';

export default {
  layout: 'custom',
  components: {
    ...Components,
  },

  async fetch() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start();
      await Promise.all([this.getProduct()]);
      this.$nuxt.$loading.finish();
    });
  },

  data() {
    return {
      userList: [],
      status: { name: 'Active', value: 'Active' },
      productData: '',
      isOpenEditProductModal: false,
      formData: {
        type: Object,
      },
      backPath: '',
    };
  },
  methods: {
    async getProduct() {
      const { data } = await this.$services.product.getProduct(
        this.$route.params.id,
      );
      this.productData = data;
      // console.log('data: ', this.productData )
      return data;
    },
    async onClickEdit() {
      this.isOpenEditProductModal = true;
    },
    async onCloseEditProductModal() {
      this.isOpenEditProductModal = false;
    },
    async onClickEditModal() {
      const request = {
        id: this.productData.id,
        name: this.productData.name,
        description: this.productData.description,
        status: this.productData.status.value,
      };
      // this.$nuxt.$loading.start();
      const res = await this.$services.product.updateProductDetail(request);
      // this.$nuxt.$loading.finish();
      this.goToPage(this.backPath);
    },
    goToPage(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss">
@import '~assets/styleguides/styleguides';

.playground {
  /* Parent style   ------------------------------ */

  /* Children style ------------------------------ */
  .playground-section {
    &.is-heading {
      margin: 0 0 56px;
    }

    &.is-heading-component {
      margin: 0 0 15px;
    }

    &.is-heading-variant {
      margin: 0 0 16px;
    }

    &.is-component {
      margin: 0 0 48px;
    }
  }

  .playground-lists {
    &.is-components {
      .playground-list {
        margin: 0 0 15px;

        &:last-child {
          margin: 0;
        }
      }
    }
  }

  .playground-text {
    &.is-heading {
      @include typography-primary-base;
      font-family: $font-family-primary-bold;
      font-size: 30px;
      color: $color-black;
    }

    &.is-heading-component {
      @include typography-primary-bold-22;
      color: $color-black;
    }

    &.is-heading-variant {
      @include typography-primary-semibold-16;
      color: $color-black;
    }
  }

  .playground-line {
    &.is-partition {
      margin: 0 0 48px;
      border-bottom: 1px solid $color-gray-1;
    }
  }
  /* Other component style ----------------------- */
}
</style>
