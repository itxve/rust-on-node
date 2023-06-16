use napi::Result;
use napi_derive::napi;

#[napi]
fn eat(thin: String) {
  println!("I'am {}", thin);
}

#[napi]
fn plus100(start: u32, end: u32) -> i64 {
  let mut rt = 0;
  for it in start..end {
    rt += it
  }
  rt.into()
}
