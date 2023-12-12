import { Departament } from '@/types/departament';
import { BasicModel } from "./basic-model"
import { Unit } from './unit';
import { Company } from './company';
import { Permission, PermissionExtended } from './permission';

export type Resource = BasicModel & {
	resource_table_id?: number, //id from Company, Unit or departament
	ref_table: 'companies' | 'units' | 'departaments',
	level: number,
	hierarchy: Hierarchy []
}

export type Hierarchy = {
    resource_id: number,
    ref_table: 'companies' | 'units' | 'departaments', 
    level: number
}

export type ResourceExtended = Resource & {
	children?: ResourceExtended [],
	tableInfo?: Company | Unit | Departament,
	permissions?: PermissionExtended[]
}

export enum RefTable {
	company = 'companies',
	unit = 'units',
	departament = 'departaments'
}