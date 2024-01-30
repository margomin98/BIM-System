import axios from 'axios'
import { defineStore } from 'pinia'
import {  useUtilsStore, useAPIStore } from '@/store'
import { UnitArray, PackageUnitArray } from '@/assets/js/dropdown'
import router from '@/router';
// lodash
import _ from "lodash"
import { useRoute } from 'vue-router';
// 入庫作業
export const useStorageStore = defineStore('Storage', {
	// method
	actions: {

	},
})