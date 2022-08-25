<template>
  <Layout>
      <Grid>
      <GridCol isNarrow>
        <CustomSidebar 
            :isExpand="isOpenSideMenu"
            :isMenuDashboard="true"
            :srcImageUser="'/images/graphics/placeholder-image-user-white.svg'"
            :onClickToggleExpand="toggleSideMenu"
        />
      </GridCol>
      <GridCol isGrow>
        <Container isMainContent>
          <nuxt />
        </Container>
      </GridCol>
      </Grid>
  </Layout>
</template>

<script>
import Components from "~/components/index.ts";
import CustomSidebar from '~/components/Sidebar/CustomSidebar.vue';

export default {
  components: {
    CustomSidebar,
    ...Components,
  },
  data() {
    const isOpenSideMenu = this.$services.main.getIsOpenSideMenu();
    return {
      isOpenSideMenu,
    };
  },

  mounted() {
    // this.$notify({
    //   group: 'VALIDATION',
    //   text: 'Notification message.',
    // });
  },

  methods: {
    toggleSideMenu() {
      this.isOpenSideMenu = !this.isOpenSideMenu;
      this.$services.main.setIsOpenSideMenu(this.isOpenSideMenu);
    },
  },
}
</script>


<style lang="scss">
  @import "~assets/styleguides/styleguides";

  .blank-layout-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 60px;
  }
</style>
