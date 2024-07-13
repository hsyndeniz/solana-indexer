export interface BlockMeta {
  slot: bigint;
  blockhash: string;
  rewards: {
    rewards: any[];
  };
  block_time: {
    timestamp: number;
  };
  block_height: {
    block_height: bigint;
  };
  parent_slot: bigint;
  parent_blockhash: string;
  executed_transaction_count: number;
  entries_count: number;
}

export interface Account {
  pubkey: string;
  lamports: number;
  owner: any;
  executable: boolean;
  rent_epoch: number;
  data: any;
  write_version: number;
  txn_signature: any;
}

export interface Transaction {
  signature: string;
  is_vote: boolean;
  transaction: {
    signatures: any;
    message: {
      header: Header;
      account_keys: any;
      recent_blockhash: number[];
      instructions: Instruction[];
      versioned: boolean;
      address_table_lookups: any[];
    };
  };
  slot: number;
  meta: Meta;
  index: number;
}

export interface Meta {
  err: null;
  fee: number;
  pre_balances: number[];
  post_balances: number[];
  inner_instructions: any[];
  inner_instructions_none: boolean;
  log_messages: string[];
  log_messages_none: boolean;
  pre_token_balances: any[];
  post_token_balances: any[];
  rewards: any[];
  loaded_writable_addresses: any[];
  loaded_readonly_addresses: any[];
  return_data: null;
  return_data_none: boolean;
  compute_units_consumed: number;
}

export interface Header {
  num_required_signatures: number;
  num_readonly_signed_accounts: number;
  num_readonly_unsigned_accounts: number;
}

export interface Instruction {
  program_id_index: number;
  accounts: number[];
  data: number[];
}
