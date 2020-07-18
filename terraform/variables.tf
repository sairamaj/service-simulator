variable "prefix" {
  description = "The prefix used for all resources in this example"
}

variable "rg_name" {
  description = "Resource group name"
  default     = "testsim-rg"
}

variable "rg_location" {
  description = "Resource group location"
  default     = "eastus"
}

variable "simulator_data_storage_account_name" {
  description = "Storage account name"
  default     = "testsim"
}

variable "simulator_data_storage_account_key" {
  description = "Storage account key"
}

variable "simulator_data_share_name" {
  description = "file provider share name"
  default     = "simulatordatafiles"
}