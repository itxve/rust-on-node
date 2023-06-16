#![deny(clippy::all)]

use napi_derive::napi;

use core::time;
use futures::prelude::*;
use napi::bindgen_prelude::*;
use napi::*;
use tokio::fs;
mod my;

#[napi]
pub async fn read_file_async(path: String) -> Result<Buffer> {
  fs::read(path)
    .map(|r| match r {
      Ok(content) => Ok(content.into()),
      Err(e) => Err(Error::new(
        Status::GenericFailure,
        format!("failed to read file, {}", e),
      )),
    })
    .await
}

#[napi]
pub async fn async_plus_100(p: Promise<u32>) -> Result<u32> {
  let v = p.await?;
  std::thread::sleep(time::Duration::from_secs(5));
  Ok(v + 100)
}

struct PlusOneAsync(u32);

#[napi]
impl Task for PlusOneAsync {
  type Output = u32;
  type JsValue = JsNumber;

  fn compute(&mut self) -> Result<Self::Output> {
    std::thread::sleep(time::Duration::from_secs(2));
    Ok(self.0 + 1)
  }

  fn resolve(&mut self, env: Env, output: Self::Output) -> Result<Self::JsValue> {
    env.create_uint32(output)
  }
}

#[napi]
fn async_fib(input: u32) -> AsyncTask<PlusOneAsync> {
  AsyncTask::new(PlusOneAsync(input))
}

#[napi(object)]
struct Agdvt {
  pub sgt: Option<String>,
}

#[napi]
fn update_agdvt(mut agt: Agdvt, gh: String) -> Result<Agdvt> {
  agt.sgt = Some(gh);
  Ok(agt)
}
