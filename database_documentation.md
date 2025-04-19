# Database Documentation for `soc_db_7842`

## Overview
This document provides a comprehensive overview of the `soc_db_7842` database, including its tables, stored procedures, events, and other relevant details.

## Database Details
- **Host**: society-tenant.cktdyxjl2rtm.ap-south-1.rds.amazonaws.com
- **Server Version**: 10.11.10-MariaDB-log
- **Character Set**: latin1
- **Collation**: latin1_swedish_ci

## Tables

### 1. `album_photos`
- **Columns**:
  - `id`: int(11), Primary Key, Auto Increment
  - `album_id`: int(11)
  - `soc_id`: int(11)
  - `image`: varchar(255)
  - `description`: varchar(50)
  - `status`: int(11)
  - `created_by`: int(11)
  - `modified_by`: int(11)
  - `created_date`: datetime, Default: current_timestamp()
  - `modified_date`: datetime, Default: current_timestamp()

### 2. `chsone_accounts_master`
- **Columns**:
  - `account_id`: int(11), Primary Key, Auto Increment
  - `soc_id`: int(11)
  - `ledger_account_id`: int(11)
  - `account_name`: varchar(100)
  - `bank_name`: varchar(100)
  - `branch`: varchar(100)
  - `account_number`: varchar(50)
  - `bank_address`: varchar(256)
  - `bank_city`: varchar(100)
  - `bank_ifsc`: varchar(50)
  - `default_account`: int(11), Default: 0
  - `created_by`: int(11)
  - `added_on`: datetime
  - `modified_on`: datetime
  - `status`: int(4)
  - `group_id`: int(11)
  - `active_for_payments`: int(11), Default: 0
  - `default_bank_for_incidental`: int(4), Default: 0
  - `default_bank_for_nonmember`: int(4)

### 3. `chsone_amc_master`
- **Columns**:
  - `amc_id`: int(11), Primary Key, Auto Increment
  - `vendor_id`: int(11), Default: 0
  - `start_date`: date
  - `end_date`: date

### 4. `chsone_amenities_tpl`
- **Columns**:
  - `amen_tpl_id`: int(11), Primary Key, Auto Increment
  - `soc_amen_name`: varchar(45)
  - `added_on`: datetime
  - `modified_on`: datetime
  - `status`: int(4)

### 5. `chsone_assets`
- **Columns**:
  - `assets_id`: int(11), Primary Key, Auto Increment
  - `assets_name`: varchar(100)
  - `assets_tag_number`: varchar(45)
  - `assets_vendor_id`: int(11)
  - `assets_categories_id`: int(11)
  - `assets_location`: varchar(100)
  - `vendor_bill_type_purchase`: varchar(50)
  - `purchase_ledger_id`: int(11)
  - `assets_purchase_date`: date
  - `assets_cost`: double(14,3), Default: 0.000
  - `assets_cost_currency`: varchar(3)
  - `added_on`: datetime
  - `updated_on`: datetime
  - `status`: int(4), Default: 1
  - `soc_id`: int(11), Default: 0

### 6. `chsone_assets_categories`
- **Columns**:
  - `assets_categories_id`: int(11), Primary Key, Auto Increment
  - `assets_categories_name`: varchar(100)
  - `assets_categories_type`: char(11)
  - `asset_opening_balance`: double(14,3)
  - `added_on`: datetime
  - `updated_on`: datetime
  - `status`: char(11), Default: '0'
  - `soc_id`: int(11)
  - `assets_ledger_id`: int(10)
  - `ledgercreated`: int(4)

### 7. `chsone_asset_invetory_setting`
- **Columns**:
  - `id`: int(11), Primary Key, Auto Increment
  - `asset_invetory_key`: varchar(45)
  - `asset_invetory_value`: varchar(45)
  - `asset_inventory_description`: varchar(45)

### 8. `chsone_bank_reco_master`
- **Columns**:
  - `bank_reco_txn_id`: bigint(11), Primary Key, Auto Increment
  - `txn_id`: bigint(11)
  - `soc_id`: int(11)
  - `txn_from_id`: bigint(11)
  - `ledger_account_id`: int(11)
  - `ledger_account_name`: varchar(45)
  - `financial_year`: varchar(100)
  - `year`: varchar(45)
  - `month`: int(2)
  - `is_reconcile_confirmed`: int(2)
  - `bank_date`: date
  - `value_date`: date

### 9. `chsone_cashbook_folios`
- **Columns**:
  - `id`: int(11), Primary Key, Auto Increment
  - `cashbook_folio_no`: bigint(12)
  - `source_cashbook_folio_id`: int(11)
  - `share_certificate_id`: int(11)
  - `created_date`: datetime
  - `created_by`: bigint(12)
  - `updated_date`: datetime
  - `updated_by`: bigint(12)

### 10. `chsone_challan_accounts`
- **Columns**:
  - `challan_accounts_id`: int(11), Primary Key, Auto Increment
  - `account_key`: varchar(100)
  - `ledger_id`: int(11), Default: 0
  - `context`: varchar(50)

### 11. `chsone_committees`
- **Columns**:
  - `committee_id`: int(11), Primary Key, Auto Increment
  - `soc_id`: bigint(12)
  - `parent_id`: int(11), Default: 0
  - `committee_name`: varchar(100)
  - `effective_date`: date
  - `dissolve_date`: date, Default: '0000-00-00'
  - `resolution_of_form`: text
  - `resolution_of_form_date`: date, Default: '0000-00-00'
  - `resolution_to_dissolve`: text
  - `resolution_to_dissolve_date`: date, Default: '0000-00-00'
  - `created_date`: datetime
  - `created_by`: bigint(12)
  - `updated_date`: datetime
  - `updated_by`: bigint(12)

### 12. `chsone_committee_members`
- **Columns**:
  - `committee_member_id`: int(11), Primary Key, Auto Increment
  - `soc_id`: bigint(12)
  - `fk_committee_id`: int(11)
  - `fk_member_id`: int(11)
  - `fk_unit_id`: int(11)
  - `designation_name`: varchar(100)
  - `on_board_from`: date
  - `end_date`: date, Default: '0000-00-00'
  - `created_date`: datetime
  - `created_by`: bigint(12)
  - `updated_date`: datetime
  - `updated_by`: bigint(12)

### 13. `chsone_credit_accounts`
- **Columns**:
  - `credit_account_id`: int(11), Primary Key, Auto Increment
  - `soc_id`: bigint(12)
  - `payment_tracker_id`: int(11)
  - `invoice_number`: varchar(50)
  - `payment_date`: date
  - `account_id`: int(11)
  - `account_name`: varchar(50)
  - `account_context`: varchar(35)
  - `amount`: double(14,3)
  - `type`: varchar(50), Default: 'income'
  - `payment_mode`: varchar(50)
  - `transaction_type`: varchar(20)
  - `narration`: text
  - `use_credit`: varchar(50)
  - `use_credit_after`: date
  - `is_invoice_rectification`: int(4)
  - `is_locked`: int(4), Default: 0
  - `income_account_id`: bigint(20), Default: 0
  - `use_credit_for`: varchar(50)
  - `reference_no`: varchar(85)
  - `context`: varchar(50)
  - `created_name`: varchar(50)
  - `created_by`: int(11)
  - `updated_by`: int(11)
  - `created_date`: datetime
  - `updated_date`: datetime

## Stored Procedures

### `accountclosure`
- **Parameters**:
  - `soc_id`: INT(11)
  - `start_date`: DATE
  - `end_date`: DATE
  - `created_by`: INT
  - `conflag`: SMALLINT(5)
- **Description**: This procedure handles the closure of accounts for a given society ID within a specified date range.

## Events

### `accountPeriodMonitoring`
- **Schedule**: Every 1 day starting from '2022-01-21 00:00:00'
- **Description**: This event monitors the account period and triggers the `accountclosure` procedure for societies with financial years ending the previous day and not yet closed.

## Character Set and Collation
- **Character Set**: latin1
- **Collation**: latin1_swedish_ci

## Notes
- Ensure all procedures and events are tested in a development environment before deploying to production.
- Regularly update this documentation to reflect any changes in the database schema or logic.