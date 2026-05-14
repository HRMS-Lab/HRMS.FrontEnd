import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private menuEvent = new Subject<void>();

  // Observable to subscribe
  menuEvent$ = this.menuEvent.asObservable();

  // Method to trigger the event
  triggerMenuFunction() {
    this.menuEvent.next();
  }

  getOrgId(): number {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const tokenObj = jwtDecode(token) as { OrganizationID?: number };
        return tokenObj.OrganizationID || 0;
      } catch (error) {
        console.error("Error decoding token:", error);
        return 0;
      }
    }
    return 0;
  }

  groupByPayTempHead(items: any[]): any[] {
    if (!items || !items.length) return [];

    const groupedMap = new Map<number, any>();

    items.forEach(item => {
      if (!groupedMap.has(item.payTempHeadId)) {
        // Create new group with header info
        groupedMap.set(item.payTempHeadId, {
          payTempHeadId: item.payTempHeadId,
          orgId: item.orgId,
          templateName: item.templateName,
          templateDesc: item.templateDesc,
          refrence: item.refrence,
          active: item.active,
          headerDateCreated: item.headerDateCreated,
          headerDateUpdated: item.headerDateUpdated,
          deduction: [],
          earning: []
        });
      }

      const group = groupedMap.get(item.payTempHeadId);

      // Add the line item to the appropriate array
      if (item.influncetype === 'Deduction') {
        group.deduction.push({
          payInfID: item.payInfID,
          amount: item.amount
        });
      } else if (item.influncetype === 'Earning') {
        group.earning.push({
          payInfID: item.payInfID,
          amount: item.amount
        });
      }
    });

    // Convert the map values to an array
    const result = Array.from(groupedMap.values());
    console.log(result);

    return Array.from(groupedMap.values());
  }
}
