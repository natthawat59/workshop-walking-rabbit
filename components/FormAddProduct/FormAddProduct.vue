<template>
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
                <div class="playground-text ">Product name</div>
            </div>
            </GridCol>
            <GridCol>
                <Input
                    :width="250"
                    :placeholder="'product name'"
                    :name="'product name'"
                    v-model="name"
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
                    v-model="description"
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
                    v-model="status"
                /> 
            </GridCol>
        </Grid>
            </div>
        </div>
    </div>
    </div>
        <div class="playground-section is-heading-component">
            <Button isColorBlue :width="100"  :onClick="saveForm">Submit</Button>
            <Button isColorRed :width="100" :onClick='onClickBack' >Cancel</Button>
        </div>
    </Container>
</template>


<script>

import Button from './../Button/index.ts';
import Grid from './../Grid/index.ts';
import Input from './../Input/index.ts';
import Select from './../Select/index.ts';
import Textarea from './../Textarea/index.ts';
import Container from './../Container/index'


export default {
    name: 'FormAddProduct',
    components: {
        Button: Button.Button,
        Grid: Grid.Grid,
        GridCol: Grid.GridCol,
        Input: Input.Input,
        Select: Select.Select,
        Textarea: Textarea.Textarea,
        Container: Container.Container,
    },

    props: {
        label: {
        type: String,
        },
        onBack: {
        type: Function,
        },
        onSave: {
        type: Function,
        },
        formData: {
        type: Object,
        },
    },

    data() {
        return {
            name: '',
            description: '',
            status: null,
        }
    },

    mounted() {
        if (this.formData) {
            this.name = this.formData.name;
            this.status = this.formData.status && {
                name: this.formData.status,
                value: this.formData.status,
            };
            this.description = this.formData.description;
        }
    },

    methods: {
        saveForm() {
            // this.$v.$touch();
            this.onSave({
                ...this,
            });
        },
        onClickBack() {
            this.onBack(false, this.$constants.ROUTE.PRODUCT.PATH);
            
        },
    }

}
</script>