import { Department } from '../department';
import { Driver } from '../driver';
import { Frequency } from '../frequency';
import { Pillar } from '../pillar';
import { Uom } from '../uom';
import { Userlist } from '../userlist';

export interface KpiTrdeeModel{
 [x: string]: any;
 Id: number;
 Label: string;
 Type: string;
 StyleClass: string;
 uoms: Uom;
 drivers: Driver[];
 frequencies: Frequency;
 pillars: Pillar[];
 departments: Department[];
 formula: string;
 responsible: Userlist[];
 consult: Userlist[];
 informed: Userlist[];
 accountable: Userlist[];
}
