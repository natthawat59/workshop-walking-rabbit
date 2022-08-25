<template>
  <Panel isFluidVertical isContentTertiary isHeadingTertiary :heading="''">
    <Container>
      <div class="playground">
        <div class="playground-section is-heading-component">
          <div class="playground-text is-heading-component">Product List</div>
        </div>
        <div class="playground-section is-heading-component">
          <Button isColorBlue :width="100" :onClick="onClickCreate">Add</Button>
        </div>

        <div class="playground-section is-heading-component">
          <Table isStripes>
            <THead>
              <TR>
                <TH isSticky><TInfo isHeading>Name</TInfo></TH>
                <TH isSticky>
                  <TInfo isHeading>Description</TInfo>
                </TH>
                <TH isSticky>
                  <TInfo isHeading>Status</TInfo>
                </TH>
                <TH isSticky>
                  <TInfo isHeading>Action</TInfo>
                </TH>
              </TR>
            </THead>
            <TBody>
              <TR v-for="product in productList" :key="product.id">
                <TD>
                  <TInfo>{{ product.name }}</TInfo>
                </TD>
                <TD>
                  <TInfo> {{ product.description }}</TInfo>
                </TD>
                <TD>
                  <TInfo>
                    {{ product.status || '-' }}
                    <!-- <Select
                  :width="120"
                  :placeholder="'Select option'"
                  :options="[ { name: 'Active', value: 'Active' },  { name: 'Inactive', value: 'Inactive' }]"
                  v-model="statusList"
                />  -->
                  </TInfo>
                </TD>
                <TD isOperations class="is-actions">
                  <TOperations isButtonGroup>
                    <TOperations
                      isEdit
                      :onClick="onClickEdit.bind(this, product.id)"
                    />
                    <TOperations
                      isDelete
                      :onClick="onClickDelete.bind(this, product.id)"
                    />
                  </TOperations>
                </TD>
              </TR>
            </TBody>
          </Table>
        </div>
        <ModalConfirm
          isThemeRed
          :isShow="modalConfirmCancelDaily.isOpenCancelDaily"
          :onBackdrop="onClickCloseConfirmCancelDaily"
          :onConfirm="onClickConfirmDeleteProduct"
          :onClose="onClickCloseConfirmCancelDaily"
          header="Confirm Delete Product "
          description="Please confirm delete product."
          subDescription="(You can add new product after delete but your delete product will remain)"
          dataTestId="modal-cancel-daily"
        />
      </div>
    </Container>
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
      await Promise.all([this.getProductList()]);
      this.$nuxt.$loading.finish();
    });
  },

  data() {
    return {
      userList: [],
      statusList: null,
      productList: [],
      modalConfirmCancelDaily: {
        isOpenCancelDaily: false,
      },
      dataConfirmDeleteModal: 0,
    };
  },

  methods: {
    async getProductList() {
      const { data } = await this.$services.product.getProductList({
        page: 1,
        status: 'Active',
      });
      this.productList = this.$_.take(data, 10);
      this.statusList = this.productList.map((e) => ({
        name: e.status,
        value: e.status,
      }));
      console.log('status', this.statusList);
      return data;
    },
    async onClickConfirmDeleteProduct() {
      this.$nuxt.$loading.start();
      await this.$services.product.deleteProduct(this.dataConfirmDeleteModal);
      this.productList = [];
      await this.getProductList();
      this.modalConfirmCancelDaily.isOpenCancelDaily = false;
      this.$nuxt.$loading.finish();
    },
    goToPage(path) {
      this.$router.push(path);
    },
    onClickEdit(id) {
      this.goToPage(`edit-product/${id}`);
    },
    onClickCreate() {
      this.goToPage(`addProduct`);
    },
    displayStatus(id) {
      const status = this.statusList.find((e) => e.id === id);
      return _.get(status, 'value');
    },
    onClickDelete(id) {
      this.modalConfirmCancelDaily.isOpenCancelDaily = true;
      this.dataConfirmDeleteModal = id;
    },
    onClickCloseConfirmCancelDaily() {
      this.modalConfirmCancelDaily.isOpenCancelDaily = false;
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
