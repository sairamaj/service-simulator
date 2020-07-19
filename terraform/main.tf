provider "azurerm" {
  version = "=2.0.0"
  features {}
}

resource "azurerm_container_group" "example" {
  name                = "${var.prefix}-continst"
  location            = var.rg_location
  resource_group_name = var.rg_name
  ip_address_type     = "public"
  dns_name_label      = "${var.prefix}-continst"
  os_type             = "linux"

  container {
    name   = "simtest"
    image  = "sairamaj/servicesimulator:v10"
    cpu    = "0.5"
    memory = "1.5"

    ports {
      port     = 80
      protocol = "TCP"
    }
    volume {
      name       = "data"
      mount_path = "//data/fileprovider"
      read_only  = false
      share_name = var.simulator_data_share_name

      storage_account_name = var.simulator_data_storage_account_name
      storage_account_key  = var.simulator_data_storage_account_key
    }
  }

  container {
    name   = "sidecar"
    image  = "microsoft/aci-tutorial-sidecar"
    cpu    = "0.5"
    memory = "1.5"
    ports {
      port     = 443
      protocol = "TCP"
    }

  }

  tags = {
    environment = "testing"
  }
}