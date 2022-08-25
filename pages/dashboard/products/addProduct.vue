<template>
    <Panel isFluidVertical isContentTertiary isHeadingTertiary :heading="''">
      <FormAddProduct 
        :onBack="onBack"
        :onSave="onSave"
      />


    <!-- <Container>
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
                <div class="playground-text ">Product name</div>
            </div>
            </GridCol>
            <GridCol>
                <Input
                    :width="250"
                    :placeholder="'product name'"
                    :name="'product name'"
                    
                    v-model="productList.name"
                />
            </GridCol>
        </Grid>
    </div>
    <div class="playground-section is-heading-component">
        <Grid isGutter30>
            <GridCol>
                <div class="playground-section is-heading-variant">
                    <div class="playground-text ">Description</div>
                </div>
            </GridCol>
            <GridCol>
                <Textarea 
                    :width="250"
                    :name="'Description'"
                    v-model="productList.description"
                />
            </GridCol>
        </Grid>
    </div>
    <div class="playground-section is-heading-component">
        <Grid >
            <Gridcol>
            <div class="playground-section is-heading-variant">
                <div class="playground-text ">Status</div>
            </div>
            </Gridcol>
            <GridCol>
                <Select
                    :width="250"
                    :placeholder="'Select option'"
                    :options= "[ { name: 'Active', value: 'Active'}, { name: 'Inactive', value: 'Inactive'} ]"
                    v-model="productList.status"
                /> 
            </GridCol>
        </Grid>
            </div>
        </div>
    </div>
    </div>
        <div class="playground-section is-heading-component">
            <Button isColorBlue :width="100" :onClick="onClickSave(productList)" >Submit</Button>
            <Button isColorRed :width="100" :onClick='onClickCancel' >Cancel</Button>
        </div>
    </Container> -->
    </Panel>
</template>

<script>
import Components from '~/components/index.ts';

export default {
  layout: 'custom',
  components: {
    ...Components,
  },


  data() {
    return {
      productList: [],
      backPath: '',
    };
  },
  methods: {
    goToPage(path) {
      this.$router.push(path);
    },
    async onSave(dataForm) {
      const request  = {
        name : dataForm.name,
        description : dataForm.description, 
        status: dataForm.status.value,
      };
      const result = await this.$services.product.postProduct(request);

      if (result.message === 'Success') {
        // this.projectID = result.data.id;

        console.log('success')
        this.goToPage(this.backPath);
        // this.goToPage(`/project/create-team/${result.data.id}`);
      } else {
        console.log('cancel')
        // this.$functions.alert.error({
          // message: result.message,
        // });
      }
      
    },
    onBack(data, path) {
      this.backPath = path;
      if (data) {
        this.modalConfirmLeave = true;
      } else {
        this.goToPage(this.backPath);
      }
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
