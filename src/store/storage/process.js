import axios from 'axios'
import { defineStore } from 'pinia'
import {  useUtilsStore, useAPIStore } from '@/store'
import { UnitArray, PackageUnitArray } from '@/assets/js/dropdown'
import router from '@/router';
// lodash
import _ from "lodash"
import { useRoute } from 'vue-router';

export const useStorageStore = defineStore('Storage', {
	// method
	actions: {

	},
})